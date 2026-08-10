import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// 1. CORS Configuration
// Credentials must be enabled because authentication uses HttpOnly cookies
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// 2. Body Parsing & Cookie Parsing Middleware
app.use(express.json());
app.use(cookieParser());

// 3. Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'BookNest Auth Backend is running' });
});

// 4. Mount Authentication Routes
app.use('/api/auth', authRoutes);

// 5. 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Requested endpoint does not exist.' });
});

// 6. Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred.' });
});

// 7. Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 BookNest Backend running on http://localhost:${PORT}`);
  console.log(`🔒 Configured CORS origin: ${FRONTEND_URL}`);
});
