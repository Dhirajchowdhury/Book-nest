import { Router } from 'express';
import { signup, login, logout, getMe } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Public Authentication Routes
 */
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

/**
 * Protected Routes (Requires valid JWT cookie)
 */
router.get('/me', requireAuth, getMe);

export default router;
