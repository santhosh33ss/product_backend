import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const path = require('path');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
