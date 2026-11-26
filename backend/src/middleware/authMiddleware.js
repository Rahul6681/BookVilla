import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'bookvilla_secure_jwt_secret_key_2026_india';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'bookvilla_secure_refresh_secret_key_2026_india';

// Generate standard access token (short-lived, 1 hour)
export const generateAccessToken = (userId, role = 'user') => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || '1h'
  });
};

// Generate refresh token (long-lived, 30 days)
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  });
};

// Backwards compatibility helper
export const generateToken = (userId, email) => {
  return generateAccessToken(userId);
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

// Protect middleware to verify Bearer access token
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
      if (error.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Access token has expired. Please refresh using /api/auth/refresh-token');
      }
      throw new ApiError(401, 'Not authorized. Invalid access token.');
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized. No Bearer token provided.');
  }
});

// Role-Based Authorization Middleware (RBAC)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required for this operation.');
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Forbidden: Role '${req.user.role}' is not authorized to access this resource. Required roles: ${roles.join(', ')}`
      );
    }
    next();
  };
};

export const adminOnly = authorizeRoles('admin');
export const curatorOrAdmin = authorizeRoles('admin', 'curator');
