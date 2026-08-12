import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const errorName = err.error || (status === 500 ? 'Internal Server Error' : 'Error');
  const message = status === 500 ? 'An unexpected error occurred.' : err.message;

  logger.error(err.message || 'Server error', err, {
    method: req.method,
    url: req.originalUrl,
    status
  });

  res.status(status).json({
    error: errorName,
    message
  });
}
