import { ApiError } from '../utils/apiError.js';

/**
 * Unit IV: 404 Not Found Middleware
 */
export const notFound = (req, res, next) => {
  const error = new ApiError(404, `API route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

/**
 * Unit IV: Centralized Error Handling Middleware
 * Gracefully handles:
 * - Custom ApiError
 * - Mongoose CastError (invalid ObjectId)
 * - Mongoose ValidationError (schema validation failure)
 * - MongoDB Duplicate Key Error (E11000)
 * - Multer File Upload errors
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Mongoose bad ObjectId CastError
  if (err.name === 'CastError') {
    const message = `Resource not found with invalid ID: ${err.value}`;
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const message = `Duplicate value entered for ${field}. Please use another value.`;
    error = new ApiError(409, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ApiError(400, `Validation Failed: ${messages.join(', ')}`, messages);
  }

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error = new ApiError(400, 'File upload failed: Maximum file size allowed is 5MB.');
    } else {
      error = new ApiError(400, `File upload error: ${err.message}`);
    }
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`[ERROR] 💥 ${req.method} ${req.originalUrl} | Status: ${statusCode} | ${message}`);
  if (process.env.NODE_ENV === 'development' && error.stack) {
    console.error(error.stack);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {})
  });
};

