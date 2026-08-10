import { supabase } from '../config/supabase.js';

/**
 * Find a user by their email address.
 * Used during signup (to check duplicates) and login (to retrieve user record).
 * 
 * @param {string} email 
 * @returns {Promise<object|null>} The user record or null if not found
 */
export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 is Supabase error code for "0 rows found", which is an expected non-error case
    console.error('Database query error in findUserByEmail:', error.message);
  }

  return data || null;
}

/**
 * Create a new user in the database.
 * 
 * @param {string} email 
 * @param {string} passwordHash 
 * @returns {Promise<object>} Created user record (id, email, created_at)
 */
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
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return data;
}

/**
 * Find a user by their unique ID.
 * Used by protected routes (/api/auth/me) to fetch authenticated user info without password hash.
 * 
 * @param {string} id 
 * @returns {Promise<object|null>} Safe user record or null if not found
 */
export async function findUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Database query error in findUserById:', error.message);
  }

  return data || null;
}
