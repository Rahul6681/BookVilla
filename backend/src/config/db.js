import mongoose from 'mongoose';

let isConnected = false;

/**
 * MongoDB & Mongoose Architecture
 * Connects to MongoDB (Local or MongoDB Atlas) using Mongoose ODM.
 */
export async function connectDB() {
  if (isConnected) {
    console.log('[DB] ⚡ Using existing MongoDB connection.');
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookvilla';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      autoIndex: true
    });

    isConnected = true;
    console.log(`[DB] 🌿 MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('[DB] ❌ MongoDB Connection Error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('[DB] ⚠️ MongoDB Disconnected.');
    });
  } catch (error) {
    console.error(`[DB] ❌ MongoDB Connection Failed: ${error.message}`);
    console.log('[DB] 💡 Tip: Ensure mongod is running on port 27017 or provide MONGODB_URI in backend/.env');
  }
}

export function checkDbStatus() {
  return mongoose.connection.readyState === 1;
}

