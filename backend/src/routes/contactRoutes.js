import express from 'express';
import { submitContactInquiry, getAllInquiries } from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .get(getAllInquiries)
  .post(submitContactInquiry);

export default router;
