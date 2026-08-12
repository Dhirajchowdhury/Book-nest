import { findUserByEmail, createUser, findUserById } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';


const getCookieOptions = () => ({
  httpOnly: true, 
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax', 
  maxAge: 86400000, // as 1 day = 86400000 milliseconds
});

export async function signup(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Input Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are must.',
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
        message: 'This email address already exists.',
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
      message: 'Signup failed. Please try again later.',
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 6. Input Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required.',
      });
    }

    // 7. Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password.',
      });
    }

    // 8. Compare password with stored hash
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password.',
      });
    }

    // 9. Generate JWT
    const token = generateToken(user.id);

    // 10. Set JWT as HttpOnly Cookie
    res.cookie('token', token, getCookieOptions());

    // 11. Return success response
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

export async function logout(req, res) {
  try {

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


export async function getMe(req, res) {
  try {

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
