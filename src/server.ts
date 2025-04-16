import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';
import path from 'path';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productsRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', userRoutes);         // For registration & login
app.use('/api/products', productRoutes);  // For CRUD product APIs

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI || '', {
    dbName: 'productApp',
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });






// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes';
// import productRoutes from './routes/productsRoutes';
// import path from 'path';


// // app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// // app.use('/api/products', productRoutes);
// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use('/api/auth', userRoutes);

// mongoose
// .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/products')
// .then(() => {
//     console.log('MongoDB connected...');
//     app.listen(process.env.PORT || 5000, () =>
//         console.log(`Server running on http://localhost:${process.env.PORT || 5000}`)
// );
// })
// .catch((err) => console.error('MongoDB connection failed:', err));
