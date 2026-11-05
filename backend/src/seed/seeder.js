import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from '../models/Book.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { Contact } from '../models/Contact.js';
import { SEED_CATEGORIES, SEED_BOOKS, SEED_ORDERS } from './indianBooksData.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    console.log('[SEEDER] 🧹 Purging existing collections...');
    await Promise.all([
      Book.deleteMany({}),
      Category.deleteMany({}),
      Order.deleteMany({}),
      Contact.deleteMany({})
    ]);

    console.log('[SEEDER] 📥 Seeding Indian literature categories...');
    await Category.insertMany(SEED_CATEGORIES);

    console.log('[SEEDER] 📥 Seeding iconic Indian books & reviews...');
    await Book.insertMany(SEED_BOOKS);

    console.log('[SEEDER] 📥 Seeding sample orders with Indian addresses...');
    await Order.insertMany(SEED_ORDERS);

    console.log('[SEEDER] ✅ All Indian data successfully imported into MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error(`[SEEDER] ❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    console.log('[SEEDER] ⚠️ Destroying all data in collections...');
    await Promise.all([
      Book.deleteMany({}),
      Category.deleteMany({}),
      Order.deleteMany({}),
      Contact.deleteMany({})
    ]);

    console.log('[SEEDER] 🗑️ All data destroyed.');
    process.exit(0);
  } catch (error) {
    console.error(`[SEEDER] ❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
