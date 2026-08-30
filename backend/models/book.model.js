import { supabase } from '../config/supabase.js';

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

export async function findBooksByUserId(userId, { search, status } = {}) {
  let query = supabase
    .from('books')
    .select('*, book_documents(*)')
    .eq('user_id', userId);

  if (status && status !== 'All') {
    query = query.eq('status', status);
  }

  if (search && search.trim() !== '') {
    const searchTerm = `%${search.trim()}%`;
    query = query.or(`title.ilike.${searchTerm},author.ilike.${searchTerm}`);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error(`Database error fetching books: ${error.message}`);
  }

  return data || [];
}

export async function findBookByIdAndUserId(bookId, userId) {
  const { data, error } = await supabase
    .from('books')
    .select('*, book_documents(*)')
    .eq('id', bookId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Database query error in findBookByIdAndUserId:', error.message);
  }

  return data || null;
}

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
