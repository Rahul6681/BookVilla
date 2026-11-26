import express from 'express';
import {
  getAllBooks,
  getBookById,
  getFeaturedBooks,
  getTrendingBooks,
  createBook,
  updateBook,
  deleteBook,
  addReview
} from '../controllers/bookController.js';
import { protect, adminOnly, curatorOrAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { bookSchema, reviewSchema } from '../validators/index.js';

const router = express.Router();

router.route('/')
  .get(getAllBooks)
  .post(protect, curatorOrAdmin, validate(bookSchema), createBook);

router.get('/featured', getFeaturedBooks);
router.get('/trending', getTrendingBooks);

router.route('/:id')
  .get(getBookById)
  .put(protect, curatorOrAdmin, updateBook)
  .delete(protect, adminOnly, deleteBook);

router.post('/:id/reviews', validate(reviewSchema), addReview);

export default router;
