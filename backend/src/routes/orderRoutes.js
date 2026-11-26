import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { orderSchema } from '../validators/index.js';

const router = express.Router();

router.route('/')
  .get(getAllOrders)
  .post(validate(orderSchema), createOrder);

router.route('/:id')
  .get(getOrderById);

router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
