import {createBook,findBooksByUserId,findBookByIdAndUserId,updateBook,deleteBook} from '../models/book.model.js';

export async function createBookHandler(req, res, next) {
  try {
    const { title, author, cover_image_url, status, rating, personal_notes } = req.body;
    const userId = req.user.id;

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
    next(error);
  }
}

export async function getBooksHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { search, status } = req.query;

    const rawBooks = await findBooksByUserId(userId, { search, status });
    const books = rawBooks.map((b) => ({
      ...b,
      document: Array.isArray(b.book_documents) ? b.book_documents[0] || null : b.book_documents || null,
    }));

    return res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
}

export async function getBookByIdHandler(req, res, next) {
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

    const formattedBook = {
      ...book,
      document: Array.isArray(book.book_documents) ? book.book_documents[0] || null : book.book_documents || null,
    };

    return res.status(200).json({ book: formattedBook });
  } catch (error) {
    next(error);
  }
}

export async function updateBookHandler(req, res, next) {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { title, author, cover_image_url, status, rating, personal_notes } = req.body;

    const existingBook = await findBookByIdAndUserId(bookId, userId);
    if (!existingBook) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found.',
      });
    }

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
    next(error);
  }
}

export async function deleteBookHandler(req, res, next) {
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
    next(error);
  }
}
