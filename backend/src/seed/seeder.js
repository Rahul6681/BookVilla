import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from '../models/Book.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { Contact } from '../models/Contact.js';
import { User } from '../models/User.js';
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
      Contact.deleteMany({}),
      User.deleteMany({})
    ]);

    console.log('[SEEDER] 📥 Seeding Indian literature categories...');
    await Category.insertMany(SEED_CATEGORIES);

    console.log('[SEEDER] 📥 Seeding iconic Indian books & reviews...');
    await Book.insertMany(SEED_BOOKS);

    console.log('[SEEDER] 📥 Seeding sample orders with Indian addresses...');
    await Order.insertMany(SEED_ORDERS);

    console.log('[SEEDER] 📥 Seeding registered users in MongoDB...');
    const seedUsers = [
      {
        fullName: 'Rahul Pandit',
        email: 'rahul.pandit@bookvilla.in',
        password: 'BookVilla2026!',
        phone: '+91 98765 43210',
        address: 'Flat 101, Gulmohar Enclave, MG Road, New Delhi',
        pincode: '110001',
        city: 'New Delhi',
        state: 'Delhi',
        role: 'admin',
        membershipTier: 'BookVilla Rasika Patron',
        wishlist: ['god-of-small-things', 'malgudi-days']
      },
      {
        fullName: 'Priya Iyer',
        email: 'priya.iyer@bookvilla.in',
        password: 'BookVilla2026!',
        phone: '+91 98200 12345',
        address: '14, Temple View Apartments, Malleshwaram, Bengaluru',
        pincode: '560003',
        city: 'Bengaluru',
        state: 'Karnataka',
        role: 'user',
        membershipTier: 'Classic Bibliophile',
        wishlist: ['wings-of-fire']
      },
      {
        fullName: 'Ananya Sen',
        email: 'ananya.sen@bookvilla.in',
        password: 'BookVilla2026!',
        phone: '+91 98301 98765',
        address: '27B, Sarat Bose Road, Ballygunge, Kolkata',
        pincode: '700029',
        city: 'Kolkata',
        state: 'West Bengal',
        role: 'user',
        membershipTier: 'Heritage Scholar',
        wishlist: ['train-to-pakistan']
      }
    ];

    for (const u of seedUsers) {
      await User.create(u);
    }

    console.log('[SEEDER] 📥 Seeding sample customer inquiries...');
    await Contact.create({
      name: 'Vikramaditya Roy',
      email: 'vikram@example.in',
      phone: '+91 98111 22334',
      subject: 'First Edition Rabindranath Tagore Gitanjali Inquiry',
      message: 'Kindly confirm availability of the 1912 illustrated edition with express courier delivery to Varanasi.'
    });

    console.log('[SEEDER] ✅ All 5 collections (Books, Categories, Orders, Users, Contacts) successfully seeded into MongoDB!');
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

