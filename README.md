# 📚 BookVilla — Sanctuary of Indian Literature & Rare Folios

[![Full-Stack MERN](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-1E3A2F?style=for-the-badge&logo=mongodb)](https://github.com/Rahul6681/BookVilla)
[![API Documentation](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D?style=for-the-badge&logo=swagger)](http://localhost:5000/api-docs)
[![License: ISC](https://img.shields.io/badge/License-ISC-C5A059?style=for-the-badge)](LICENSE)

> **CAP646 — Full Stack Web Development**  
> An end-to-end full-stack e-commerce web application dedicated exclusively to Indian literature, philosophy, translated classics, and regional contemporary works. Built adhering strictly to modern industry patterns and the academic curriculum from **Unit I through Unit V**.

---

## 🇮🇳 Project Overview & Indian Context

BookVilla is crafted to celebrate and preserve the rich literary heritage of India. Every book, author, publisher, review, currency, and postal route in this application is **100% rooted in India**:

- **Indian Authors & Visionaries**: Rabindranath Tagore, R.K. Narayan, Dr. A.P.J. Abdul Kalam, Munshi Premchand, Arundhati Roy, Eknath Easwaran, Chitra Banerjee Divakaruni, Amitav Ghosh, Jhumpa Lahiri, Amish Tripathi, Sudha Murty, Khushwant Singh.
- **Indian Publishing Houses**: Penguin India Modern Classics, Indian Thought Publications, Universities Press India, Nilgiri Press, Rupa Publications, Rajkamal Prakashan, Westland, HarperCollins India.
- **Indian Financials & Logistics**: Native pricing in Indian Rupees (**₹ INR**), 5% Indian GST invoicing, Blue Dart Air Express tracking, and delivery validation across **19,000+ Indian Postal PIN codes** (e.g., Bengaluru `560038`, Kolkata, Delhi, Varanasi, Chennai).

---

## 🏛️ Syllabus Architecture Alignment (Units I – V)

### 🎨 Unit I: Web Foundations & Responsive Front-End Development
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
- Custom CSS3 variables (`variables.css`) defining an Indian heritage palette (Deep Forest Green `#1E3A2F`, Antique Parchment `#FDFBF7`, Rich Terracotta Rust `#8F2D19`, Heritage Gold `#C5A059`).
- Responsive design via CSS Grid and Flexbox with mobile-first media queries (`@media (max-width: 768px)`).

### ⚡ Unit II: Modern JavaScript (ES6+) & DOM Programming
- Modular ES6+ architecture (`import` / `export`), async/await, Promise handling, array destructing, spread/rest operators.
- Browser `localStorage` and `sessionStorage` management for persistent cart state and patron session data.

### ⚛️ Unit III: React Front-End Development
- **Component-Driven Architecture**: Modular components (`BookCard`, `CartItem`, `Navbar`, `Footer`, `ErrorBoundary`, `ProtectedRoute`).
- **State Management & Custom Hooks**: Context API (`AuthContext`, `CartContext`), custom hooks (`useFetch`, `useCart`, `useAuth`).
- **React Router v6**: Client-side routing with code-splitting via `React.lazy` and `Suspense` fallbacks.
- **Client-Side CRUD Interface**: Cart operations, dynamic filtering, multi-field search, client sorting.

### 🚀 Unit IV: Server-Side Development with Node.js & Express.js
- **MVC Architecture**: Models, Controllers, Routes, and Middleware strictly segregated.
- **RESTful API Development**: Clean REST URI designs and HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `500 Internal Error`).
- **File Upload using Multer**: Configured with `multer.diskStorage`, mime-type validation (JPEG, PNG, WEBP), and 5MB size limits, serving static folios from `/uploads/books/`.
- **Email Integration using Nodemailer**: Automated dispatch of HTML invoices with Indian PIN codes, Blue Dart tracking, and GST breakdown via SMTP / Ethereal mailer.
- **Centralized Error Handling**: Custom `ApiError` class, `asyncHandler` wrapper, and global error middleware catching CastErrors and duplicate keys.
- **Logging & Debugging**: HTTP request logging using `morgan` alongside custom color-coded timestamp request logs.
- **API Documentation using Swagger**: Interactive OpenAPI 3.0 specification explorer hosted live at `/api-docs`.

### 🍃 Unit V: MongoDB, Mongoose ODM & Full Stack Integration
- **Mongoose ODM & Strict Validation**: Schemas for `Book`, `Category`, `Order`, `Review`, and `Contact` with regex validations (Indian phone numbers, 6-digit postal PIN codes).
- **Embedded Subdocuments & Relationships**: Book reviews modeled as embedded subdocuments; orders referencing books and customers.
- **Indexing & Full-Text Search**: Mongoose compound text search indexes across `title`, `author`, and `synopsis`, alongside compound sorting indexes.
- **Aggregation Pipelines**: Real MongoDB aggregations (`$group`, `$project`, `$facet`, `$sort`, `$limit`) calculating total inventory valuation in INR, category distribution, and top author metrics.
- **Server-Side Pagination**: Standard pagination parameters (`page`, `limit`, `skip`) returning pagination metadata (`totalItems`, `totalPages`, `hasNextPage`, `hasPrevPage`).
- **Transactions Demonstration**: Inventory verification and stock decrement session workflows.
- **Full-Stack Integration & Proxy**: Vite reverse-proxy configuration (`vite.config.js`) forwarding `/api` and `/uploads` to Express on port 5000, with graceful offline fallback.
- **Git Version Control**: Structured `.gitignore` keeping secrets and build artifacts safe with clean commits.

---

## 📂 Repository File Structure

```
BookVilla/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js             # MongoDB Mongoose connection
│   │   │   ├── multer.js         # Multer diskStorage & image filters
│   │   │   └── swagger.js        # Swagger OpenAPI 3.0 specification
│   │   ├── controllers/
│   │   │   ├── bookController.js     # CRUD, search, filter, pagination, reviews
│   │   │   ├── categoryController.js # Category listings & creation
│   │   │   ├── contactController.js  # Customer inquiry handling
│   │   │   ├── orderController.js    # Stock decrement, transaction demo, orders
│   │   │   ├── statsController.js    # MongoDB Aggregation Pipelines
│   │   │   └── uploadController.js   # Multer file upload endpoint
│   │   ├── middleware/
│   │   │   ├── errorHandler.js   # 404 & Centralized error handler
│   │   │   └── logger.js         # Custom colored request logger
│   │   ├── models/
│   │   │   ├── Book.js           # Book & Review subdocument schema
│   │   │   ├── Category.js       # Indian collection genres
│   │   │   ├── Contact.js        # Inquiries schema
│   │   │   └── Order.js          # Order schema with Indian address validation
│   │   ├── routes/
│   │   │   ├── bookRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── statsRoutes.js
│   │   │   └── uploadRoutes.js
│   │   ├── seed/
│   │   │   ├── indianBooksData.js # 100% Indian literature dataset
│   │   │   └── seeder.js          # Database seeder runner (npm run seed)
│   │   ├── utils/
│   │   │   ├── apiError.js       # Operational error class
│   │   │   ├── apiResponse.js    # Standardized JSON response helper
│   │   │   ├── asyncHandler.js   # Async try-catch elimination
│   │   │   └── emailService.js   # Nodemailer HTML invoices & Ethereal mailer
│   │   └── server.js             # Main Express server entry point
│   ├── uploads/
│   │   └── books/                # Multer static uploads directory
│   ├── .env.example              # Environment variables template
│   └── package.json              # Backend dependencies & npm scripts
├── src/
│   ├── components/               # Navbar, Footer, BookCard, CartItem, ErrorBoundary
│   ├── context/                  # AuthContext, CartContext
│   ├── data/                     # mockBooks.js fallback dataset
│   ├── hooks/                    # useAuth, useCart, useFetch
│   ├── pages/
│   │   ├── Home.jsx              # Landing page & featured books
│   │   ├── Shop.jsx              # Catalog with server filters & pagination
│   │   ├── ProductDetail.jsx     # Detail view, PIN checker & live reviews
│   │   ├── Cart.jsx              # Basket with coupon calculation
│   │   ├── Checkout.jsx          # Indian checkout & Nodemailer order creation
│   │   ├── Account.jsx           # Order history & patron profile
│   │   └── Portal.jsx            # Live DB Aggregations, Multer & API testing
│   ├── services/
│   │   └── api.js                # Full-Stack API integration layer
│   ├── styles/                   # Modular CSS stylesheets
│   ├── App.jsx                   # Route splitting & application layout
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json                  # Root scripts (server, client, seed)
├── vite.config.js                # Vite dev server & reverse proxy
└── README.md
```

---

## 🔌 REST API Endpoints Specification

### 📖 Books API (`/api/books`)
| Method | Endpoint | Query Parameters / Body | Description |
|---|---|---|---|
| `GET` | `/api/books` | `page`, `limit`, `search`, `category`, `minPrice`, `maxPrice`, `minRating`, `inStock`, `sortBy` | Paginated books with server-side filtering & search |
| `GET` | `/api/books/:id` | Path param (`id` or `slug`) | Retrieve book details |
| `GET` | `/api/books/featured` | — | Retrieve curated featured Indian classics |
| `GET` | `/api/books/trending` | — | Retrieve trending books |
| `POST` | `/api/books` | `{ title, author, category, price, isbn, ... }` | Add new Indian folio to catalog |
| `PUT` | `/api/books/:id` | Book fields to update | Update book record |
| `DELETE` | `/api/books/:id` | — | Remove folio from archives |
| `POST` | `/api/books/:id/reviews` | `{ userName, rating, comment }` | Add reader review & recalculate average rating |

### 📊 MongoDB Aggregation Pipelines (`/api/stats`)
| Method | Endpoint | MongoDB Pipeline Stages | Description |
|---|---|---|---|
| `GET` | `/api/stats/overview` | `$facet`, `$group`, `$multiply`, `$sort` | Catalog analytics: Total folios, total valuation in INR, average price, format split |
| `GET` | `/api/stats/categories` | `$group`, `$project`, `$round`, `$sort` | Genre metrics: Count, avg/min/max price, avg rating |
| `GET` | `/api/stats/authors` | `$group`, `$project`, `$push`, `$sort`, `$limit` | Top Indian authors by publication count and reviews |

### 📦 Orders & Transactions (`/api/orders`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Places order, verifies & decrements stock count, dispatches Nodemailer invoice |
| `GET` | `/api/orders` | Retrieves recent orders (supports `?email=...` filter) |
| `GET` | `/api/orders/:id` | Retrieves single order by `orderNumber` |
| `PATCH` | `/api/orders/:id/status` | Updates order delivery tracking status |

### 🖼️ Multer File Uploads (`/api/upload`)
| Method | Endpoint | Content-Type | Description |
|---|---|---|---|
| `POST` | `/api/upload/book-cover` | `multipart/form-data` (Field: `cover`) | Uploads image to `uploads/books/` and returns static asset URL |

### 📬 Nodemailer Contact (`/api/contact`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submits customer inquiry and dispatches confirmation email |

---

## 🛠️ Installation & Setup Guide

### 1. Prerequisites
- **Node.js**: `v18.x` or higher (`node -v`)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### 2. Clone the Repository
```bash
git clone https://github.com/Rahul6681/BookVilla.git
cd BookVilla
```

### 3. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables
Copy the example environment configuration in `backend/`:
```bash
cp backend/.env.example backend/.env
```
Default configuration inside `backend/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/bookvilla
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM="BookVilla Books <orders@bookvilla.in>"
UPLOAD_DIR=uploads/books
```
*(If no email credentials are provided, Nodemailer will auto-generate an Ethereal test inbox and print live preview links in the console!)*

### 5. Seed the Indian Literature Database
Populate MongoDB with categories, iconic Indian titles, customer reviews, and orders:
```bash
npm run seed
```

### 6. Run the Application
In one terminal, start the **Express backend server**:
```bash
npm run server
```
*Backend runs at `http://localhost:5000`*

In a second terminal, start the **Vite React frontend**:
```bash
npm run client
```
*Frontend runs at `http://localhost:3000`*

---

## 🧪 Live Verification & Interactive Exploration

- **Interactive Swagger Documentation**:  
  Visit [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs) to execute live API calls, inspect request schemas, and check status responses.
- **Backend & Database Portal (Frontend)**:  
  Navigate to the **⚡ DB & Backend API** tab in the navigation bar (`http://localhost:3000/portal`) to test:
  1. Real-time MongoDB Aggregation Pipeline statistics
  2. Multer drag-and-drop file uploader
  3. Live Nodemailer dispatch tester
- **System Health Endpoint**:  
  Visit [`http://localhost:5000/api/health`](http://localhost:5000/api/health) to confirm active MongoDB connection and server uptime.

---

## 📜 Academic Integrity & License
Developed as part of **CAP646: Full Stack Web Development (CA1 Assessment)**.  
Licensed under the [ISC License](LICENSE).
