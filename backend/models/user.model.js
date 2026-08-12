import { supabase } from '../config/supabase.js';

export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Database error in findUserByEmail is:', error.message);
  }

  return data || null;
}

export async function createUser(email, passwordHash) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email: email.toLowerCase(),
        password_hash: passwordHash,
      },
    ])
    .select('id, email, created_at')
    .single();

  if (error) {
    throw new Error(`user not created: ${error.message}`);
  }

  return data;
}

export async function findUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Database error in findUserById is :', error.message);
  }

  return data || null;
}
