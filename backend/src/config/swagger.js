/**
 * API Documentation using Swagger (OpenAPI 3.0)
 * Mounts interactive Swagger UI at /api-docs for live testing of all endpoints.
 */
import swaggerUi from 'swagger-ui-express';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'BookVilla RESTful API & Indian Folio Archive',
    version: '1.0.0',
    description: `
      ## BookVilla Enterprise RESTful API Services
      High-performance backend API services for BookVilla: India's Premier Online Bookstore.
      
      ### Production Architecture Highlights:
      - **Node.js & Express.js Services**: MVC Architecture, modular routing, structured request logging, and centralized error handling.
      - **Media Processing & Storage**: Book cover folio uploads with strict MIME-type validation and disk storage.
      - **Notification & Invoicing Engine**: Automated dispatch confirmations with Indian GST calculation and Blue Dart tracking summaries.
      - **MongoDB & Mongoose Data Layer**: Strongly typed schemas, indexes, text search, relations, and real-time aggregation pipelines.
      - **Catalog Query Engine**: Multi-parameter filtering, range operators, and server-side pagination.
      - **Atomic Transaction Workflow**: Two-phase inventory reservation and order placement with ACID compliance.
    `,
    contact: {
      name: 'BookVilla Engineering Team',
      email: 'curator@bookvilla.in'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development Server (Local Express)'
    }
  ],
  tags: [
    { name: 'Books', description: 'Browse, search, filter, paginate, and manage Indian literature' },
    { name: 'Categories', description: 'Curated genre collections of Indian & world literature' },
    { name: 'Orders', description: 'Place orders, track delivery across 19,000+ Indian PIN codes' },
    { name: 'Stats & Aggregations', description: 'MongoDB Aggregation Pipelines for business intelligence' },
    { name: 'Uploads', description: 'Multer file uploads for book covers and folios' },
    { name: 'Authentication', description: 'User registration, login, JWT issuance, and MongoDB profiles' },
    { name: 'Contact', description: 'Customer inquiries and Nodemailer acknowledgment' },
    { name: 'Health', description: 'System and database health diagnostics' }
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API and MongoDB server status',
        responses: {
          200: {
            description: 'API is healthy and operational'
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new customer account in MongoDB',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['fullName', 'email', 'password'],
                properties: {
                  fullName: { type: 'string', example: 'Vikramaditya Roy' },
                  email: { type: 'string', example: 'vikram.roy@example.in' },
                  password: { type: 'string', example: 'SecretPass2026!' },
                  phone: { type: 'string', example: '+91 98765 43210' },
                  address: { type: 'string', example: 'Flat 4B, Ganga Vihar, Varanasi, UP' },
                  pincode: { type: 'string', example: '221001' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'User successfully created in MongoDB with JWT token' },
          409: { description: 'Email already exists' }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Authenticate credentials and issue JWT session token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'rahul.pandit@bookvilla.in' },
                  password: { type: 'string', example: 'BookVilla2026!' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful, returns user profile and JWT' },
          401: { description: 'Invalid email or password' }
        }
      }
    },
    '/api/auth/users': {
      get: {
        tags: ['Authentication'],
        summary: 'List all registered customer accounts from MongoDB (Admin Telemetry)',
        responses: {
          200: { description: 'List of registered users from MongoDB' }
        }
      }
    },
    '/api/books': {
      get: {
        tags: ['Books'],
        summary: 'Retrieve books with server-side pagination, search, and multi-field filters',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Page number' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 6 }, description: 'Items per page' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search title, author, or ISBN' },
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filter by category slug or ID' },
          { name: 'minPrice', in: 'query', schema: { type: 'number' }, description: 'Minimum price in INR' },
          { name: 'maxPrice', in: 'query', schema: { type: 'number' }, description: 'Maximum price in INR' },
          { name: 'minRating', in: 'query', schema: { type: 'number' }, description: 'Minimum rating (0 - 5)' },
          { name: 'inStock', in: 'query', schema: { type: 'boolean' }, description: 'Filter only in-stock books' },
          {
            name: 'sortBy',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['featured', 'price-asc', 'price-desc', 'rating', 'newest'],
              default: 'featured'
            },
            description: 'Sort criteria'
          }
        ],
        responses: {
          200: {
            description: 'Paginated list of books retrieved successfully'
          }
        }
      },
      post: {
        tags: ['Books'],
        summary: 'Add a new Indian book folio to the catalog',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BookInput' }
            }
          }
        },
        responses: {
          201: { description: 'Book created successfully' },
          400: { description: 'Validation error' }
        }
      }
    },
    '/api/books/featured': {
      get: {
        tags: ['Books'],
        summary: 'Get curated featured Indian literary works',
        responses: {
          200: { description: 'List of featured books' }
        }
      }
    },
    '/api/books/trending': {
      get: {
        tags: ['Books'],
        summary: 'Get trending titles across India',
        responses: {
          200: { description: 'List of trending books' }
        }
      }
    },
    '/api/books/{id}': {
      get: {
        tags: ['Books'],
        summary: 'Get single book folio by MongoDB ObjectId or URL slug',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Book ObjectId or slug (e.g. malgudi-days)' }
        ],
        responses: {
          200: { description: 'Book details retrieved' },
          404: { description: 'Book not found' }
        }
      },
      put: {
        tags: ['Books'],
        summary: 'Update book details',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/BookInput' }
            }
          }
        },
        responses: {
          200: { description: 'Book updated successfully' }
        }
      },
      delete: {
        tags: ['Books'],
        summary: 'Remove book folio from catalog',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Book deleted successfully' }
        }
      }
    },
    '/api/books/{id}/reviews': {
      post: {
        tags: ['Books'],
        summary: 'Submit a reader review for a book',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['userName', 'rating', 'comment'],
                properties: {
                  userName: { type: 'string', example: 'Priya Sundaram' },
                  rating: { type: 'number', minimum: 1, maximum: 5, example: 5 },
                  comment: { type: 'string', example: 'Magnificent printing and classic narrative style.' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Review posted and book rating recomputed' }
        }
      }
    },
    '/api/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Retrieve all book categories',
        responses: {
          200: { description: 'List of categories' }
        }
      }
    },
    '/api/orders': {
      get: {
        tags: ['Orders'],
        summary: 'List recent orders with pagination',
        responses: {
          200: { description: 'List of orders' }
        }
      },
      post: {
        tags: ['Orders'],
        summary: 'Place order with atomic stock decrement and Nodemailer confirmation',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderInput' }
            }
          }
        },
        responses: {
          201: { description: 'Order created, stock reserved, email dispatched' }
        }
      }
    },
    '/api/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order details by Order Number or ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Order details' }
        }
      }
    },
    '/api/stats/overview': {
      get: {
        tags: ['Stats & Aggregations'],
        summary: 'MongoDB Aggregation Pipeline: Overall catalog & inventory analytics',
        responses: {
          200: { description: 'Aggregated catalog metrics' }
        }
      }
    },
    '/api/stats/categories': {
      get: {
        tags: ['Stats & Aggregations'],
        summary: 'MongoDB Aggregation Pipeline: Category breakdown (count, avg price, avg rating)',
        responses: {
          200: { description: 'Aggregated category distribution' }
        }
      }
    },
    '/api/stats/authors': {
      get: {
        tags: ['Stats & Aggregations'],
        summary: 'MongoDB Aggregation Pipeline: Top Indian authors and publication metrics',
        responses: {
          200: { description: 'Top authors metrics' }
        }
      }
    },
    '/api/upload/book-cover': {
      post: {
        tags: ['Uploads'],
        summary: 'Upload book folio cover image using Multer',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  cover: {
                    type: 'string',
                    format: 'binary',
                    description: 'Book cover image file (JPEG, PNG, WebP)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Image uploaded and static URL generated' }
        }
      }
    },
    '/api/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Send inquiry message and trigger Nodemailer receipt',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'subject', 'message'],
                properties: {
                  name: { type: 'string', example: 'Aarav Sharma' },
                  email: { type: 'string', example: 'aarav@bookvilla.in' },
                  phone: { type: 'string', example: '+91 9876543210' },
                  subject: { type: 'string', example: 'Inquiry regarding collector edition' },
                  message: { type: 'string', example: 'Do you offer leather-bound editions of Premchand classics?' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Contact inquiry recorded and email sent' }
        }
      }
    }
  },
  components: {
    schemas: {
      BookInput: {
        type: 'object',
        required: ['title', 'author', 'category', 'price', 'isbn', 'publisher', 'coverImage', 'synopsis'],
        properties: {
          title: { type: 'string', example: 'Malgudi Days' },
          subtitle: { type: 'string', example: 'Illustrated Stories with Sketches by R.K. Laxman' },
          author: { type: 'string', example: 'R.K. Narayan' },
          authorBio: { type: 'string', example: 'Celebrated Indian novelist born in Madras.' },
          category: { type: 'string', example: 'indian-literature' },
          price: { type: 'number', example: 299 },
          originalPrice: { type: 'number', example: 350 },
          isbn: { type: 'string', example: '978-8185986173' },
          pages: { type: 'number', example: 288 },
          publisher: { type: 'string', example: 'Indian Thought Publications' },
          publishYear: { type: 'number', example: 1943 },
          edition: { type: 'string', example: 'Heritage Collector Edition' },
          format: { type: 'string', example: 'Paperback' },
          inStock: { type: 'boolean', example: true },
          stockCount: { type: 'number', example: 30 },
          coverImage: { type: 'string', example: 'https://covers.openlibrary.org/b/id/11195847-L.jpg' },
          synopsis: { type: 'string', example: 'Thirty-two warm, humorous stories of everyday life in Malgudi.' }
        }
      },
      OrderInput: {
        type: 'object',
        required: ['customerName', 'customerEmail', 'customerPhone', 'shippingAddress', 'items', 'totalAmount'],
        properties: {
          customerName: { type: 'string', example: 'Aarav Sharma' },
          customerEmail: { type: 'string', example: 'aarav.sharma@bookvilla.in' },
          customerPhone: { type: 'string', example: '9876543210' },
          shippingAddress: {
            type: 'object',
            required: ['fullName', 'address', 'city', 'state', 'postalCode'],
            properties: {
              fullName: { type: 'string', example: 'Aarav Sharma' },
              address: { type: 'string', example: 'Flat 402, Shanti Nilayam, 14th Main, Indiranagar' },
              city: { type: 'string', example: 'Bengaluru' },
              state: { type: 'string', example: 'Karnataka' },
              postalCode: { type: 'string', example: '560038' },
              country: { type: 'string', example: 'India' }
            }
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                bookId: { type: 'string', example: 'malgudi-days' },
                title: { type: 'string', example: 'Malgudi Days' },
                author: { type: 'string', example: 'R.K. Narayan' },
                price: { type: 'number', example: 299 },
                quantity: { type: 'number', example: 1 }
              }
            }
          },
          subtotal: { type: 'number', example: 299 },
          tax: { type: 'number', example: 15 },
          shippingCost: { type: 'number', example: 0 },
          discount: { type: 'number', example: 0 },
          totalAmount: { type: 'number', example: 314 },
          paymentMethod: { type: 'string', example: 'upi' },
          upiId: { type: 'string', example: 'aarav@okaxis' }
        }
      }
    }
  }
};

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerDocument, {
  customCss: `
    .swagger-ui .topbar { background-color: #1E3A2F; border-bottom: 3px solid #C5A059; }
    .swagger-ui .topbar .topbar-wrapper a span { color: #F7E7CE; font-family: Georgia, serif; font-size: 20px; font-weight: bold; }
    .swagger-ui .btn.execute { background-color: #8F2D19; border-color: #8F2D19; }
    .swagger-ui .btn.authorize { color: #1E3A2F; border-color: #1E3A2F; }
  `,
  customSiteTitle: 'BookVilla API Documentation'
});

