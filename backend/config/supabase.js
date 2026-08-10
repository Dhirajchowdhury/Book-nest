import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Read Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Warn if credentials are missing
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️ Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in backend/.env');
}

/**
 * Initialize Supabase Client
 * 
 * We use Supabase exclusively as a PostgreSQL database client.
 * The service_role key allows our backend server to query the database directly.
 * This client is NEVER exposed to the frontend browser.
 */
export const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');
