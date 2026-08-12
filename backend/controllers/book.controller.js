import {
  createBook,
  findBooksByUserId,
  findBookByIdAndUserId,
  updateBook,
  deleteBook,
} from '../models/book.model.js';

/**
 * Controller: Create a new book
 * POST /api/books
 */
export async function createBookHandler(req, res) {
  try {
    const { title, author, cover_image_url, status, rating, personal_notes } = req.body;
    const userId = req.user.id; // Populated by requireAuth middleware

    // 1. Input Validation
    if (!title || !title.trim() || !author || !author.trim()) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Title and author are required.',
      });
    }

    const validStatuses = ['Want to Read', 'Reading', 'Finished'];
    const bookStatus = status || 'Want to Read';
    if (!validStatuses.includes(bookStatus)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Status must be one of: Want to Read, Reading, Finished.',
      });
    }

    // 2. Rating Validation & Conditioning
    let bookRating = null;
    if (bookStatus === 'Finished') {
      if (rating !== undefined && rating !== null && rating !== '') {
        const parsedRating = Number(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
          return res.status(400).json({
            error: 'Validation Error',
            message: 'Rating must be an integer between 1 and 5.',
          });
        }
        bookRating = parsedRating;
      }
    }

    // 3. Create book record
    const newBook = await createBook({
      user_id: userId,
      title: title.trim(),
      author: author.trim(),
      cover_image_url: cover_image_url ? cover_image_url.trim() : null,
      status: bookStatus,
      rating: bookRating,
      personal_notes: personal_notes ? personal_notes.trim() : null,
    });

    return res.status(201).json({
      message: 'Book created successfully!',
      book: newBook,
    });
  } catch (error) {
    console.error('Error creating book:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to create book. Please try again.',
    });
  }
}

/**
 * Controller: Get all books belonging to authenticated user (with optional search and status filter)
 * GET /api/books
 */
export async function getBooksHandler(req, res) {
  try {
    const userId = req.user.id;
    const { search, status } = req.query;

    const books = await findBooksByUserId(userId, { search, status });

    return res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to retrieve books.',
    });
  }
}

/**
 * Controller: Get single book by ID
 * GET /api/books/:id
 */
export async function getBookByIdHandler(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await findBookByIdAndUserId(bookId, userId);

    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found.',
      });
    }

    return res.status(200).json({ book });
  } catch (error) {
    console.error('Error fetching book:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to retrieve book details.',
    });
  }
}

/**
 * Controller: Update a book by ID
 * PUT /api/books/:id
 */
export async function updateBookHandler(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { title, author, cover_image_url, status, rating, personal_notes } = req.body;

    // 1. Check if book exists and belongs to user
    const existingBook = await findBookByIdAndUserId(bookId, userId);
    if (!existingBook) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found.',
      });
    }

    // 2. Input Validation
    if (!title || !title.trim() || !author || !author.trim()) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Title and author are required.',
      });
    }

    const validStatuses = ['Want to Read', 'Reading', 'Finished'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Status must be one of: Want to Read, Reading, Finished.',
      });
    }

    // 3. Rating Validation & Conditioning
    const updatedStatus = status || existingBook.status;
    let updatedRating = null;

    if (updatedStatus === 'Finished') {
      if (rating !== undefined && rating !== null && rating !== '') {
        const parsedRating = Number(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
          return res.status(400).json({
            error: 'Validation Error',
            message: 'Rating must be an integer between 1 and 5.',
          });
        }
        updatedRating = parsedRating;
      }
    }

    // 4. Build update data payload
    const updateData = {
      title: title.trim(),
      author: author.trim(),
      cover_image_url: cover_image_url ? cover_image_url.trim() : null,
      status: updatedStatus,
      rating: updatedRating,
      personal_notes: personal_notes ? personal_notes.trim() : null,
      updated_at: new Date().toISOString(),
    };

    const updatedBook = await updateBook(bookId, userId, updateData);

    return res.status(200).json({
      message: 'Book updated successfully!',
      book: updatedBook,
    });
  } catch (error) {
    console.error('Error updating book:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to update book.',
    });
  }
}

/**
 * Controller: Delete a book by ID
 * DELETE /api/books/:id
 */
export async function deleteBookHandler(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const deletedBook = await deleteBook(bookId, userId);

    if (!deletedBook) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found.',
      });
    }

    return res.status(200).json({
      message: 'Book deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to delete book.',
    });
  }
}
