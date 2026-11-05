import mongoose from 'mongoose';

/**
 * Unit V: Mongoose ODM & Schema Validation
 * Category Schema for organizing Indian folios and collections
 */
const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    icon: {
      type: String,
      default: '📚'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Category = mongoose.model('Category', categorySchema);

