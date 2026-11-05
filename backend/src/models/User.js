import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    phone: {
      type: String,
      default: '+91 98765 43210',
      trim: true
    },
    address: {
      type: String,
      default: 'Flat 101, Gulmohar Enclave, MG Road, New Delhi',
      trim: true
    },
    pincode: {
      type: String,
      default: '110001',
      trim: true
    },
    city: {
      type: String,
      default: 'New Delhi',
      trim: true
    },
    state: {
      type: String,
      default: 'Delhi',
      trim: true
    },
    membershipTier: {
      type: String,
      enum: ['BookVilla Rasika Patron', 'Classic Bibliophile', 'Heritage Scholar'],
      default: 'BookVilla Rasika Patron'
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    wishlist: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

// Pre-save hook to hash password with bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
