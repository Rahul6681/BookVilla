import mongoose from 'mongoose';

/**
 * Unit V: Subdocument Schema for Reviews
 * Demonstrates embedded data modeling in MongoDB
 */
const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
      maxLength: [60, 'Name cannot exceed 60 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Minimum rating is 1 star'],
      max: [5, 'Maximum rating is 5 stars']
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxLength: [1000, 'Comment cannot exceed 1000 characters']
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

/**
 * Unit V: Book Schema with Mongoose ODM
 * Demonstrates:
 * - Data Types & Strict Validation
 * - Indexing (Single, Compound, and Full-Text Search)
 * - Virtual Properties (discount percentage)
 * - Pre-save hooks for slug normalization
 */
const bookSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Book title is mandatory'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true
    },
    subtitle: {
      type: String,
      trim: true,
      default: ''
    },
    author: {
      type: String,
      required: [true, 'Author name is mandatory'],
      trim: true,
      index: true
    },
    authorBio: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Book category is mandatory'],
      trim: true,
      index: true
    },
    price: {
      type: Number,
      required: [true, 'Price in INR (₹) is mandatory'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative']
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
      index: true
    },
    reviewsCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative']
    },
    isbn: {
      type: String,
      required: [true, 'ISBN identifier is mandatory'],
      unique: true,
      trim: true,
      index: true
    },
    pages: {
      type: Number,
      min: [1, 'Folio must have at least 1 page'],
      default: 200
    },
    publisher: {
      type: String,
      required: [true, 'Publisher is mandatory (e.g. Penguin India, Indian Thought Publications)'],
      trim: true
    },
    publishYear: {
      type: Number,
      default: 2024
    },
    edition: {
      type: String,
      default: 'First Collector Edition'
    },
    format: {
      type: String,
      enum: ['Paperback', 'Hardcover', "Collector's Edition", 'Special Folio', 'Box Set'],
      default: 'Paperback'
    },
    inStock: {
      type: Boolean,
      default: true,
      index: true
    },
    stockCount: {
      type: Number,
      default: 25,
      min: [0, 'Stock cannot be negative']
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image URL or asset path is mandatory']
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    trending: {
      type: Boolean,
      default: false,
      index: true
    },
    newArrival: {
      type: Boolean,
      default: false,
      index: true
    },
    synopsis: {
      type: String,
      required: [true, 'Book synopsis is mandatory'],
      trim: true
    },
    reviews: [reviewSchema]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property for discount percentage
bookSchema.virtual('discountPercent').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Full-Text Search Index across title, author, and synopsis
bookSchema.index(
  {
    title: 'text',
    author: 'text',
    synopsis: 'text'
  },
  {
    weights: {
      title: 10,
      author: 5,
      synopsis: 1
    },
    name: 'BookTextSearchIndex'
  }
);

// Compound indexes for frequent e-commerce search & filter patterns
bookSchema.index({ category: 1, price: 1 });
bookSchema.index({ category: 1, rating: -1 });

// Pre-save hook: generate slug if not provided
bookSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

export const Book = mongoose.model('Book', bookSchema);
