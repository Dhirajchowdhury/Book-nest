import { verifyToken } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required. Token missing.',
    });
  }
  
  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired authentication token.',
    });
  }
  req.user = { id: decoded.userId };
  next();
}
