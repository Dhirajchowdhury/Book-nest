import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only';

/**
 * Generate a signed JWT for an authenticated user.
 * 
 * @param {string} userId - The user's unique ID
 * @returns {string} The signed JWT string
 */
export function generateToken(userId) {
  // Store only the essential user ID inside the token payload
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
}

/**
 * Verify and decode a JWT string.
 * 
 * @param {string} token - The JWT string from cookie
 * @returns {object|null} The decoded token payload containing userId, or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Returns null if token is expired, tampered with, or invalid
    return null;
  }
}
