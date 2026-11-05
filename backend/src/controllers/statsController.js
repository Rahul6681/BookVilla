import { Book } from '../models/Book.js';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Contact } from '../models/Contact.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Aggregation Pipeline Endpoints
 * Demonstrates advanced MongoDB aggregation operators:
 * $group, $sort, $project, $facet, $match, $unwind
 */

// @desc    Get overall catalog and inventory analytics via MongoDB Aggregation
// @route   GET /api/stats/overview
// @access  Public
export const getCatalogOverview = asyncHandler(async (req, res) => {
  const [catalogStats] = await Book.aggregate([
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              totalBooks: { $sum: 1 },
              totalStockUnits: { $sum: '$stockCount' },
              averagePrice: { $avg: '$price' },
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' },
              averageRating: { $avg: '$rating' },
              totalValuationINR: {
                $sum: { $multiply: ['$price', '$stockCount'] }
              }
            }
          }
        ],
        stockStatus: [
          {
            $group: {
              _id: '$inStock',
              count: { $sum: 1 }
            }
          }
        ],
        formatDistribution: [
          {
            $group: {
              _id: '$format',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ]
      }
    }
  ]);

  const totalOrdersCount = await Order.countDocuments();
  const totalUsersCount = await User.countDocuments();
  const totalCategoriesCount = await Category.countDocuments();
  const totalContactsCount = await Contact.countDocuments();

  const formattedOverview = {
    overview: catalogStats.totals[0] || {
      totalBooks: 0,
      totalStockUnits: 0,
      averagePrice: 0,
      totalValuationINR: 0,
      averageRating: 0
    },
    stockDistribution: catalogStats.stockStatus,
    formatDistribution: catalogStats.formatDistribution,
    totalOrdersPlaced: totalOrdersCount,
    databaseCollections: {
      books: catalogStats.totals[0]?.totalBooks || 0,
      categories: totalCategoriesCount,
      orders: totalOrdersCount,
      users: totalUsersCount,
      contacts: totalContactsCount
    }
  };

  res.status(200).json(new ApiResponse(200, formattedOverview, 'Catalog analytics retrieved via Aggregation Pipeline'));
});

// @desc    Category-wise breakdown using MongoDB $group & $project Aggregation Pipeline
// @route   GET /api/stats/categories
// @access  Public
export const getCategoryStats = asyncHandler(async (req, res) => {
  const categoryStats = await Book.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        avgRating: { $avg: '$rating' },
        totalStock: { $sum: '$stockCount' }
      }
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        count: 1,
        avgPrice: { $round: ['$avgPrice', 0] },
        minPrice: 1,
        maxPrice: 1,
        avgRating: { $round: ['$avgRating', 1] },
        totalStock: 1
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json(new ApiResponse(200, categoryStats, 'Category analytics retrieved via Aggregation Pipeline'));
});

// @desc    Top Indian Authors by publication count and rating
// @route   GET /api/stats/authors
// @access  Public
export const getTopAuthors = asyncHandler(async (req, res) => {
  const authorStats = await Book.aggregate([
    {
      $group: {
        _id: '$author',
        totalBooks: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: '$reviewsCount' },
        titles: { $push: '$title' }
      }
    },
    {
      $project: {
        _id: 0,
        author: '$_id',
        totalBooks: 1,
        avgRating: { $round: ['$avgRating', 1] },
        totalReviews: 1,
        titles: 1
      }
    },
    { $sort: { totalBooks: -1, avgRating: -1 } },
    { $limit: 8 }
  ]);

  res.status(200).json(new ApiResponse(200, authorStats, 'Author metrics retrieved via Aggregation Pipeline'));
});

