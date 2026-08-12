import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'BookNest Auth Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Requested endpoint does not exist.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`BookNest Backend running on http://localhost:${PORT}`);
  console.log(`Configured CORS origin: ${FRONTEND_URL}`);
});
