import { verifyToken } from '../utils/jwt.js';

/**
 * Authentication Middleware
 * 
 * Protects backend routes by checking for a valid JWT in the HttpOnly cookie.
 * If valid, attaches user ID to req.user and passes control to the next handler.
 * If invalid or missing, rejects request with 401 Unauthorized status.
 */
export function requireAuth(req, res, next) {
  // Read token from cookies (parsed by cookie-parser middleware)
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required. Token missing.',
    });
  }

  // Verify JWT signature and expiration
  const decoded = verifyToken(token);

  if (!decoded || !decoded.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired authentication token.',
    });
  }

  // Attach decoded user information to the request object
  req.user = { id: decoded.userId };

  // Proceed to next middleware or route controller
  next();
}
