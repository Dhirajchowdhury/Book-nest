import { supabase } from '../config/supabase.js';

/**
 * Insert a new book record into Supabase.
 *
 * @param {object} bookData
 * @returns {Promise<object>} Created book record
 */
export async function createBook(bookData) {
  const { data, error } = await supabase
    .from('books')
    .insert([bookData])
    .select()
    .single();

  if (error) {
    throw new Error(`Database error creating book: ${error.message}`);
  }

  return data;
}

/**
 * Find all books belonging to a specific user, with optional search and status filters.
 *
 * @param {string} userId
 * @param {object} options - { search, status }
 * @returns {Promise<Array>} Array of book records
 */
export async function findBooksByUserId(userId, { search, status } = {}) {
  let query = supabase
    .from('books')
    .select('*')
    .eq('user_id', userId);

  // Apply status filter if specified and not 'All'
  if (status && status !== 'All') {
    query = query.eq('status', status);
  }

  // Apply search filter on title or author (case-insensitive)
  if (search && search.trim() !== '') {
    const searchTerm = `%${search.trim()}%`;
    query = query.or(`title.ilike.${searchTerm},author.ilike.${searchTerm}`);
  }

  // Order by newest first
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error(`Database error fetching books: ${error.message}`);
  }

  return data || [];
}

/**
 * Find a single book by ID belonging strictly to the authenticated user.
 *
 * @param {string} bookId
 * @param {string} userId
 * @returns {Promise<object|null>} Book record or null
 */
export async function findBookByIdAndUserId(bookId, userId) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Database query error in findBookByIdAndUserId:', error.message);
  }

  return data || null;
}

/**
 * Update a book by ID belonging strictly to the authenticated user.
 *
 * @param {string} bookId
 * @param {string} userId
 * @param {object} updateData
 * @returns {Promise<object|null>} Updated book record or null
 */
export async function updateBook(bookId, userId, updateData) {
  const { data, error } = await supabase
    .from('books')
    .update(updateData)
    .eq('id', bookId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Database error updating book: ${error.message}`);
  }

  return data || null;
}

/**
 * Delete a book by ID belonging strictly to the authenticated user.
 *
 * @param {string} bookId
 * @param {string} userId
 * @returns {Promise<object|null>} Deleted book record or null
 */
export async function deleteBook(bookId, userId) {
  const { data, error } = await supabase
    .from('books')
    .delete()
    .eq('id', bookId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Database error deleting book: ${error.message}`);
  }

  return data || null;
}
