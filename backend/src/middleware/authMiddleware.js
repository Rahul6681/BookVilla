import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'bookvilla_secure_jwt_secret_key_2026_india';

// Generate standard JWT token for user session
export const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Protect middleware to verify Bearer token
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        throw new ApiError(401, 'User account associated with this token no longer exists.');
      }
      return next();
    } catch (error) {
      throw new ApiError(401, 'Not authorized. Invalid or expired token.');
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized. No Bearer token provided.');
  }
});

// Admin role verification
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new ApiError(403, 'Forbidden. Admin privileges required.');
  }
};
