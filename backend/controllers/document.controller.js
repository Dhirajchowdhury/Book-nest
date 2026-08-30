import { supabase } from '../config/supabase.js';
import { findBookByIdAndUserId } from '../models/book.model.js';
import {
  createDocument,
  findDocumentByBookId,
  deleteDocumentByBookId,
} from '../models/document.model.js';

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || 'book-pdfs';

/**
 * Upload a PDF document for a book
 */
export async function uploadDocumentHandler(req, res, next) {
  let uploadedStoragePath = null;

  try {
    const { bookId } = req.params;
    const userId = req.user.id;
    const file = req.file;

    if (!file || !file.buffer) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'PDF file is required.',
      });
    }

    // 1. Verify book ownership
    const book = await findBookByIdAndUserId(bookId, userId);
    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found or access denied.',
      });
    }

    // 2. Magic byte validation (%PDF-)
    const header = file.buffer.slice(0, 5).toString('utf-8');
    if (!header.startsWith('%PDF-')) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'The uploaded file is not a valid PDF document.',
      });
    }

    // 3. Check for existing document for this book
    const existingDoc = await findDocumentByBookId(bookId, userId);
    if (existingDoc) {
      // Remove old file from Supabase storage safely
      try {
        await supabase.storage.from(BUCKET_NAME).remove([existingDoc.storage_path]);
      } catch (removeErr) {
        console.warn('Warning: Could not remove old PDF from storage:', removeErr.message);
      }
      // Remove old database record
      await deleteDocumentByBookId(bookId, userId);
    }

    // 4. Sanitize filename & create unique storage path
    const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${userId}/${bookId}/${Date.now()}-${sanitizedFileName}`;

    // 5. Upload buffer to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file.buffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (storageError) {
      throw new Error(`Failed to upload PDF to storage: ${storageError.message}`);
    }

    uploadedStoragePath = storagePath;

    // 6. Insert database record (With compensating transaction cleanup on failure)
    let createdDoc;
    try {
      createdDoc = await createDocument({
        book_id: bookId,
        user_id: userId,
        file_name: file.originalname,
        storage_path: storagePath,
        mime_type: 'application/pdf',
        file_size: file.size,
        source_type: 'pdf_upload',
        processing_status: 'uploaded',
      });
    } catch (dbError) {
      // Compensating Rollback: Clean up uploaded storage object if DB record creation fails
      console.error('DB record insertion failed. Cleaning up uploaded storage object...', dbError.message);
      if (uploadedStoragePath) {
        await supabase.storage.from(BUCKET_NAME).remove([uploadedStoragePath]).catch((cleanupErr) => {
          console.error('Failed to rollback storage object during DB failure cleanup:', cleanupErr.message);
        });
      }
      throw dbError;
    }

    return res.status(201).json({
      message: 'PDF document uploaded successfully!',
      document: createdDoc,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Generate short-lived signed URL for viewing/downloading the PDF securely
 */
export async function getDocumentUrlHandler(req, res, next) {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    // 1. Verify book ownership
    const book = await findBookByIdAndUserId(bookId, userId);
    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found or access denied.',
      });
    }

    // 2. Find document record
    const document = await findDocumentByBookId(bookId, userId);
    if (!document) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No PDF document found for this book.',
      });
    }

    // 3. Create signed URL valid for 60 minutes (3600s)
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(document.storage_path, 3600);

    if (error) {
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }

    return res.status(200).json({
      signedUrl: data.signedUrl,
      document,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete PDF document for a book
 */
export async function deleteDocumentHandler(req, res, next) {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    // 1. Verify book ownership
    const book = await findBookByIdAndUserId(bookId, userId);
    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found or access denied.',
      });
    }

    // 2. Find document record
    const document = await findDocumentByBookId(bookId, userId);
    if (!document) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No PDF document found for this book.',
      });
    }

    // 3. Remove file from storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([document.storage_path]);

    if (storageError) {
      console.warn('Warning: Storage file removal returned error:', storageError.message);
    }

    // 4. Delete database record
    await deleteDocumentByBookId(bookId, userId);

    return res.status(200).json({
      message: 'PDF document deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
}
