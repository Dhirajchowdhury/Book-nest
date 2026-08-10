import { findUserByEmail, createUser, findUserById } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

/**
 * Cookie options helper for consistency across login and logout.
 */
const getCookieOptions = () => ({
  httpOnly: true, // Prevents client-side JavaScript access (protects against XSS)
  secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
  sameSite: 'lax', // CSRF protection setting
  maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day in milliseconds)
});

/**
 * Controller: User Signup
 * POST /api/auth/signup
 */
export async function signup(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Input Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Password must be at least 6 characters long.',
      });
    }

    // 2. Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: 'Conflict',
        message: 'An account with this email address already exists.',
      });
    }

    // 3. Hash the plain text password
    const hashedPassword = await hashPassword(password);

    // 4. Store user in database
    const newUser = await createUser(email, hashedPassword);

    // 5. Return success response
    return res.status(201).json({
      message: 'Account created successfully! You can now log in.',
      user: {
        id: newUser.id,
        email: newUser.email,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Something went wrong during signup. Please try again later.',
    });
  }
}

/**
 * Controller: User Login
 * POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Input Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required.',
      });
    }

    // 2. Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      // Use generic error message to avoid exposing whether email exists
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password.',
      });
    }

    // 3. Compare password with stored hash
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password.',
      });
    }

    // 4. Generate JWT
    const token = generateToken(user.id);

    // 5. Set JWT as HttpOnly Cookie
    res.cookie('token', token, getCookieOptions());

    // 6. Return success response
    return res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Something went wrong during login. Please try again later.',
    });
  }
}

/**
 * Controller: User Logout
 * POST /api/auth/logout
 */
export async function logout(req, res) {
  try {
    // Clear the authentication cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.status(200).json({
      message: 'Logged out successfully.',
    });
  } catch (error) {
    console.error('Logout error:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Something went wrong during logout.',
    });
  }
}

/**
 * Controller: Get Current Authenticated User
 * GET /api/auth/me
 * Protected by requireAuth middleware
 */
export async function getMe(req, res) {
  try {
    // req.user.id is populated by requireAuth middleware
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('getMe error:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to retrieve user profile.',
    });
  }
}
