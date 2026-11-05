import { Category } from '../models/Category.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json(new ApiResponse(200, categories, 'Categories retrieved successfully'));
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Public
export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, icon } = req.body;

  if (!name || !slug) {
    throw new ApiError(400, 'Name and slug are required');
  }

  const existing = await Category.findOne({ slug });
  if (existing) {
    throw new ApiError(409, `Category with slug "${slug}" already exists`);
  }

  const category = await Category.create({ name, slug, description, icon });
  res.status(201).json(new ApiResponse(201, category, 'Category created'));
});
