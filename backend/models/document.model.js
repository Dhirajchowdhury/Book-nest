import { supabase } from '../config/supabase.js';

export async function createDocument(docData) {
  const { data, error } = await supabase
    .from('book_documents')
    .insert([docData])
    .select()
    .single();

  if (error) {
    throw new Error(`Database error creating document record: ${error.message}`);
  }

  return data;
}

export async function findDocumentByBookId(bookId, userId) {
  const { data, error } = await supabase
    .from('book_documents')
    .select('*')
    .eq('book_id', bookId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Database error in findDocumentByBookId:', error.message);
  }

  return data || null;
}

export async function deleteDocumentByBookId(bookId, userId) {
  const { data, error } = await supabase
    .from('book_documents')
    .delete()
    .eq('book_id', bookId)
    .eq('user_id', userId)
    .select()
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Database error deleting document record: ${error.message}`);
  }

  return data || null;
}

export async function updateDocumentStatus(docId, userId, status) {
  const { data, error } = await supabase
    .from('book_documents')
    .update({
      processing_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', docId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Database error updating document status: ${error.message}`);
  }

  return data;
}
