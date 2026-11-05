import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .get(getAllOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrderById);

router.patch('/:id/status', updateOrderStatus);

export default router;

