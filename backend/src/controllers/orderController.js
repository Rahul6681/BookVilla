import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Book } from '../models/Book.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';

/**
 * Unit IV & Unit V: Order Controller
 * Features:
 * - Unit V Transactions (Introduction): Atomic stock verification and inventory decrement
 * - Unit IV Nodemailer: Dispatches branded Indian invoice upon order creation
 */

// @desc    Place a new order
// @route   POST /api/orders
// @access  Public
export const createOrder = asyncHandler(async (req, res) => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    items,
    subtotal,
    tax,
    shippingCost,
    discount,
    totalAmount,
    paymentMethod,
    upiId,
    shippingMethod
  } = req.body;

  if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !items.length) {
    throw new ApiError(400, 'Customer contact, Indian shipping address, and order items are required.');
  }

  const orderNumber = `BV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // Unit V: Transaction Demonstration
  // Checks if MongoDB deployment supports multi-document transactions (Replica Set / Atlas)
  // Gracefully falls back to atomic document updates on standalone development instances.
  const isReplicaSet = mongoose.connection?.client?.topology?.description?.type === 'ReplicaSetWithPrimary' 
    || (mongoose.connection?.client?.topology?.description?.servers && Array.from(mongoose.connection.client.topology.description.servers.values()).some(s => s.type === 'RSPrimary'));

  let session = null;
  let useTransactions = false;

  if (isReplicaSet) {
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      useTransactions = true;
      console.log('[TRANSACTION] 🔒 Started MongoDB Transaction Session for Order:', orderNumber);
    } catch (err) {
      if (session) session.endSession();
      session = null;
      useTransactions = false;
    }
  } else {
    console.log('[TRANSACTION] ℹ️ Standalone MongoDB detected. Executing atomic document updates with stock verification.');
  }

  try {
    // 1. Verify availability and decrement stock count for each book
    for (const item of items) {
      const bookQuery = item.bookId
        ? { $or: [{ slug: item.bookId }, { isbn: item.bookId }] }
        : { _id: item.book };

      const book = useTransactions
        ? await Book.findOne(bookQuery).session(session)
        : await Book.findOne(bookQuery);

      if (book) {
        if (book.stockCount < item.quantity) {
          throw new ApiError(400, `Folio "${book.title}" has insufficient stock (${book.stockCount} remaining).`);
        }
        // Decrement stock count
        book.stockCount = Math.max(0, book.stockCount - item.quantity);
        if (book.stockCount === 0) {
          book.inStock = false;
        }
        if (useTransactions) {
          await book.save({ session });
        } else {
          await book.save();
        }
      }
    }

    // 2. Create Order document
    const orderData = {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal: subtotal || items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      tax: tax || 0,
      shippingCost: shippingCost || 0,
      discount: discount || 0,
      totalAmount: totalAmount || (subtotal + tax + shippingCost - discount),
      paymentMethod: paymentMethod || 'upi',
      upiId: upiId || '',
      shippingMethod: shippingMethod || 'Blue Dart Surface Express',
      orderStatus: 'Order Placed & Vault Reserved'
    };

    let newOrder;
    if (useTransactions) {
      const createdOrders = await Order.create([orderData], { session });
      newOrder = createdOrders[0];
      await session.commitTransaction();
      session.endSession();
      console.log('[TRANSACTION] ✅ MongoDB Transaction committed successfully for Order:', orderNumber);
    } else {
      newOrder = await Order.create(orderData);
    }

    // 3. Unit IV: Trigger Nodemailer confirmation email asynchronously
    sendOrderConfirmationEmail(newOrder).catch((e) =>
      console.error('[EMAIL] Background dispatch failed:', e.message)
    );

    res.status(201).json(new ApiResponse(201, newOrder, 'Order placed successfully and folio reserved.'));
  } catch (error) {
    if (useTransactions && session) {
      await session.abortTransaction();
      session.endSession();
      console.log('[TRANSACTION] 🛑 Transaction aborted and rolled back due to error:', error.message);
    }
    throw error;
  }
});

// @desc    Get all orders (admin or customer history)
// @route   GET /api/orders
// @access  Public
export const getAllOrders = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
  const skip = (page - 1) * limit;

  const emailFilter = req.query.email ? { customerEmail: req.query.email.toLowerCase() } : {};

  const [totalOrders, orders] = await Promise.all([
    Order.countDocuments(emailFilter),
    Order.find(emailFilter).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  res.status(200).json(
    new ApiResponse(200, orders, 'Orders retrieved successfully', {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit) || 1,
      totalItems: totalOrders
    })
  );
});

// @desc    Get single order by orderNumber or ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let order = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    order = await Order.findById(id);
  }
  if (!order) {
    order = await Order.findOne({ orderNumber: id });
  }

  if (!order) {
    throw new ApiError(404, `Order with identifier "${id}" not found.`);
  }

  res.status(200).json(new ApiResponse(200, order, 'Order retrieved successfully'));
});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Public
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { orderNumber: id };

  const order = await Order.findOneAndUpdate(
    query,
    { orderStatus: status },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new ApiError(404, `Order with identifier "${id}" not found.`);
  }

  res.status(200).json(new ApiResponse(200, order, 'Order status updated'));
});
