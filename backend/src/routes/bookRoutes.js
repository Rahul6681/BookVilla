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

const router = express.Router();

router.route('/')
  .get(getAllBooks)
  .post(createBook);

router.get('/featured', getFeaturedBooks);
router.get('/trending', getTrendingBooks);

router.route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

router.post('/:id/reviews', addReview);

export default router;

