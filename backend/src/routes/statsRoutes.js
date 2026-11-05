import express from 'express';
import {
  getCatalogOverview,
  getCategoryStats,
  getTopAuthors
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/overview', getCatalogOverview);
router.get('/categories', getCategoryStats);
router.get('/authors', getTopAuthors);

export default router;

