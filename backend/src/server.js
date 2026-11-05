import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, checkDbStatus } from './config/db.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import { requestLogger } from './middleware/logger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Import Routes
import bookRoutes from './routes/bookRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Built-in & Third-Party Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging & Debugging Middlewares
app.use(morgan('dev'));
app.use(requestLogger);

// Serve Static Files (Multer uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Documentation using Swagger UI
app.use('/api-docs', serveSwagger, setupSwagger);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'BookVilla RESTful API',
    database: {
      status: checkDbStatus() ? 'connected' : 'connecting/disconnected',
      engine: 'MongoDB with Mongoose ODM'
    },
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// REST API Routes
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to BookVilla REST API (India Editions)',
    docs: '/api-docs',
    health: '/api/health'
  });
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 BookVilla API Server running on: http://localhost:${PORT}`);
  console.log(`📚 Swagger Documentation at:       http://localhost:${PORT}/api-docs`);
  console.log(`🩺 Health check endpoint:          http://localhost:${PORT}/api/health`);
  console.log(`📁 Uploads served at:              http://localhost:${PORT}/uploads`);
  console.log(`======================================================\n`);
});

export default app;

