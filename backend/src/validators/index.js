import Joi from 'joi';

/**
 * Joi Validation Schemas for BookVilla (RESTful API Input Validation)
 */

// User Registration Validation Schema
export const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Full name cannot be empty',
    'string.min': 'Full name must have at least 2 characters',
    'any.required': 'Full name is required'
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).max(128).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  phone: Joi.string().trim().pattern(/^[+0-9\s-]{10,15}$/).optional().messages({
    'string.pattern.base': 'Please provide a valid Indian telephone or mobile number'
  }),
  address: Joi.string().trim().max(250).optional(),
  pincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).optional().messages({
    'string.pattern.base': 'Please provide a valid 6-digit Indian PIN code'
  }),
  city: Joi.string().trim().max(100).optional(),
  state: Joi.string().trim().max(100).optional()
});

// User Login Validation Schema
export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'A valid email address is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

// Refresh Token Validation Schema
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required'
  })
});

// Profile Update Validation Schema
export const updateProfileSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).optional(),
  phone: Joi.string().trim().pattern(/^[+0-9\s-]{10,15}$/).optional(),
  address: Joi.string().trim().max(250).optional(),
  pincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).optional(),
  city: Joi.string().trim().max(100).optional(),
  state: Joi.string().trim().max(100).optional(),
  password: Joi.string().min(6).max(128).optional()
});

// Book Creation / Update Validation Schema
export const bookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  subtitle: Joi.string().trim().max(200).optional().allow(''),
  author: Joi.string().trim().min(2).max(150).required(),
  authorBio: Joi.string().trim().optional().allow(''),
  category: Joi.string().trim().required(),
  price: Joi.number().positive().min(1).required(),
  originalPrice: Joi.number().positive().min(1).optional(),
  isbn: Joi.string().trim().required(),
  pages: Joi.number().integer().positive().optional(),
  publisher: Joi.string().trim().required(),
  publishYear: Joi.number().integer().min(1800).max(new Date().getFullYear() + 1).optional(),
  edition: Joi.string().trim().optional(),
  format: Joi.string().valid('Hardcover', 'Paperback', 'Special Collector Edition').default('Paperback'),
  inStock: Joi.boolean().default(true),
  stockCount: Joi.number().integer().min(0).default(10),
  coverImage: Joi.string().uri().optional().allow(''),
  featured: Joi.boolean().default(false),
  trending: Joi.boolean().default(false),
  newArrival: Joi.boolean().default(false),
  synopsis: Joi.string().trim().min(10).required()
});

// Book Review Validation Schema
export const reviewSchema = Joi.object({
  userName: Joi.string().trim().min(2).max(100).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().min(5).max(1000).required()
});

// Order Creation Validation Schema
export const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      book: Joi.string().optional(),
      title: Joi.string().required(),
      price: Joi.number().positive().required(),
      quantity: Joi.number().integer().positive().required(),
      coverImage: Joi.string().optional().allow('')
    })
  ).min(1).required().messages({
    'array.min': 'Order must contain at least one book item'
  }),
  shippingAddress: Joi.object({
    fullName: Joi.string().trim().min(2).required(),
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    pincode: Joi.string().trim().pattern(/^[1-9][0-9]{5}$/).required(),
    phone: Joi.string().trim().required()
  }).required(),
  paymentMethod: Joi.string().valid('UPI', 'Credit Card', 'Net Banking', 'Cash on Delivery').default('UPI')
});
