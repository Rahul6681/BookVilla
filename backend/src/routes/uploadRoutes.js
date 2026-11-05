import express from 'express';
import { uploadBookCover } from '../config/multer.js';
import { uploadBookCoverImage } from '../controllers/uploadController.js';

const router = express.Router();

// Endpoint for uploading book cover folio
router.post('/book-cover', uploadBookCover.single('cover'), uploadBookCoverImage);

export default router;
