import bcrypt from 'bcryptjs';

/**
 * Hash a plain text password using bcrypt.
 * 
 * @param {string} plainPassword - The password entered by the user
 * @returns {Promise<string>} The hashed password to store in the database
 */
export async function hashPassword(plainPassword) {
  // Salt rounds define how computationally expensive the hashing is (10 is a good standard default)
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
}

/**
 * Compare a plain text password with a stored bcrypt password hash.
 * 
 * @param {string} plainPassword - The password entered during login
 * @param {string} hashedPassword - The hash stored in the database
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
export async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
