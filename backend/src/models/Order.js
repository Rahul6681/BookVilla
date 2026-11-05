import mongoose from 'mongoose';

/**
 * Unit V: Data Modelling & Relationships
 * Order Schema representing purchases with Indian delivery PIN codes,
 * GST breakdown, payment method, and item relationships.
 */
const orderItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    bookId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    coverImage: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is mandatory'],
      trim: true
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is mandatory'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    customerPhone: {
      type: String,
      required: [true, '10-digit Indian contact phone is mandatory'],
      trim: true
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: {
        type: String,
        required: true,
        match: [/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit Indian Postal PIN Code']
      },
      country: { type: String, default: 'India' }
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'card', 'netbanking', 'cod'],
      default: 'upi'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Completed'
    },
    upiId: {
      type: String,
      trim: true
    },
    shippingMethod: {
      type: String,
      default: 'Blue Dart Surface Express'
    },
    orderStatus: {
      type: String,
      enum: [
        'Order Placed & Vault Reserved',
        'Processing',
        'Dispatched',
        'Out for Delivery',
        'Delivered (Signed by Security)',
        'Delivered',
        'Cancelled'
      ],
      default: 'Order Placed & Vault Reserved',
      index: true
    },
    trackingNumber: {
      type: String,
      default: () => `BLUEDART-${Math.floor(100000000 + Math.random() * 900000000)}IN`
    },
    date: {
      type: String,
      default: () =>
        new Intl.DateTimeFormat('en-IN', {
          month: 'long',
          day: '2-digit',
          year: 'numeric'
        }).format(new Date())
    }
  },
  {
    timestamps: true
  }
);

export const Order = mongoose.model('Order', orderSchema);
