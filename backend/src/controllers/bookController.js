import { Book } from '../models/Book.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

/**
 * Unit IV & Unit V: Book Controller (REST API + MongoDB CRUD + Query Operators + Pagination)
 */

// @desc    Get all books with server-side pagination, multi-field filtering, search, and sorting
// @route   GET /api/books
// @access  Public
export const getAllBooks = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 6));
  const skip = (page - 1) * limit;

  const { search, category, minPrice, maxPrice, minRating, inStock, sortBy } = req.query;

  // Build MongoDB query filter using Unit V Query Operators ($gte, $lte, $regex, $options, $or, $in)
  const filter = {};

  if (category && category !== 'all') {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minRating && Number(minRating) > 0) {
    filter.rating = { $gte: Number(minRating) };
  }

  if (inStock === 'true' || inStock === true) {
    filter.inStock = true;
  }

  if (search && search.trim()) {
    const trimmed = search.trim();
    filter.$or = [
      { title: { $regex: trimmed, $options: 'i' } },
      { author: { $regex: trimmed, $options: 'i' } },
      { isbn: { $regex: trimmed, $options: 'i' } },
      { publisher: { $regex: trimmed, $options: 'i' } }
    ];
  }

  // Determine sort order
  let sortCriteria = { featured: -1, rating: -1, createdAt: -1 };
  if (sortBy === 'price-asc') {
    sortCriteria = { price: 1 };
  } else if (sortBy === 'price-desc') {
    sortCriteria = { price: -1 };
  } else if (sortBy === 'rating') {
    sortCriteria = { rating: -1 };
  } else if (sortBy === 'newest') {
    sortCriteria = { publishYear: -1, createdAt: -1 };
  }

  const [totalBooks, books] = await Promise.all([
    Book.countDocuments(filter),
    Book.find(filter).sort(sortCriteria).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(totalBooks / limit) || 1;

  res.status(200).json(
    new ApiResponse(
      200,
      books,
      'Books retrieved successfully',
      {
        currentPage: page,
        totalPages,
        totalItems: totalBooks,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    )
  );
});

// @desc    Get single book by ID or slug
// @route   GET /api/books/:id
// @access  Public
export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let book = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    book = await Book.findById(id);
  }

  if (!book) {
    book = await Book.findOne({
      $or: [{ slug: id }, { isbn: id }]
    });
  }

  if (!book) {
    throw new ApiError(404, `Folio with identifier "${id}" could not be retrieved from archives.`);
  }

  res.status(200).json(new ApiResponse(200, book, 'Book retrieved successfully'));
});

// @desc    Get featured Indian books
// @route   GET /api/books/featured
// @access  Public
export const getFeaturedBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ featured: true }).sort({ rating: -1 }).limit(8);
  res.status(200).json(new ApiResponse(200, books, 'Featured folios retrieved'));
});

// @desc    Get trending Indian books
// @route   GET /api/books/trending
// @access  Public
export const getTrendingBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ trending: true }).sort({ reviewsCount: -1 }).limit(8);
  res.status(200).json(new ApiResponse(200, books, 'Trending folios retrieved'));
});

// @desc    Create a new book folio
// @route   POST /api/books
// @access  Public
export const createBook = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    author,
    authorBio,
    category,
    price,
    originalPrice,
    isbn,
    pages,
    publisher,
    publishYear,
    edition,
    format,
    inStock,
    stockCount,
    coverImage,
    featured,
    trending,
    newArrival,
    synopsis
  } = req.body;

  if (!title || !author || !category || !price || !isbn || !publisher || !synopsis) {
    throw new ApiError(400, 'All mandatory fields (title, author, category, price, isbn, publisher, synopsis) are required.');
  }

  const existingBook = await Book.findOne({ isbn });
  if (existingBook) {
    throw new ApiError(409, `Book with ISBN ${isbn} already exists in the catalog.`);
  }

  const newBook = await Book.create({
    title,
    subtitle,
    author,
    authorBio,
    category,
    price,
    originalPrice: originalPrice || price,
    isbn,
    pages: pages || 200,
    publisher,
    publishYear: publishYear || new Date().getFullYear(),
    edition: edition || 'First Edition',
    format: format || 'Paperback',
    inStock: inStock !== undefined ? inStock : true,
    stockCount: stockCount !== undefined ? stockCount : 20,
    coverImage: coverImage || 'https://covers.openlibrary.org/b/id/8282361-L.jpg',
    featured: !!featured,
    trending: !!trending,
    newArrival: newArrival !== undefined ? newArrival : true,
    synopsis
  });

  res.status(201).json(new ApiResponse(201, newBook, 'Book folio registered in archives successfully'));
});

// @desc    Update a book folio
// @route   PUT /api/books/:id
// @access  Public
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };

  const updatedBook = await Book.findOneAndUpdate(query, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedBook) {
    throw new ApiError(404, `Book with identifier "${id}" not found.`);
  }

  res.status(200).json(new ApiResponse(200, updatedBook, 'Book folio updated successfully'));
});

// @desc    Delete a book folio
// @route   DELETE /api/books/:id
// @access  Public
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };

  const deletedBook = await Book.findOneAndDelete(query);
  if (!deletedBook) {
    throw new ApiError(404, `Book with identifier "${id}" not found.`);
  }

  res.status(200).json(new ApiResponse(200, { id: deletedBook._id, title: deletedBook.title }, 'Book folio removed from archives'));
});

// @desc    Add review to book and recalculate aggregate rating
// @route   POST /api/books/:id/reviews
// @access  Public
export const addReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userName, rating, comment } = req.body;

  if (!userName || !rating || !comment) {
    throw new ApiError(400, 'User name, rating (1-5), and comment are required to leave a review.');
  }

  let book = mongoose.Types.ObjectId.isValid(id)
    ? await Book.findById(id)
    : await Book.findOne({ slug: id });

  if (!book) {
    throw new ApiError(404, `Book with identifier "${id}" not found.`);
  }

  const newReview = {
    userName: userName.trim(),
    rating: Number(rating),
    comment: comment.trim(),
    date: new Intl.DateTimeFormat('en-IN', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date())
  };

  book.reviews.unshift(newReview);
  book.reviewsCount = book.reviews.length;

  const totalRating = book.reviews.reduce((sum, rev) => sum + rev.rating, 0);
  book.rating = parseFloat((totalRating / book.reviewsCount).toFixed(1));

  await book.save();

  res.status(201).json(new ApiResponse(201, book, 'Reader review submitted and folio rating updated'));
});
