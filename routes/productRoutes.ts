import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  createProduct,
  createProductMultiple,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productcontroller'; // Make sure the path is correct

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/single', upload.single('image'), createProduct); // Single image upload
router.post('/multiple', upload.array('images', 5), createProductMultiple); // Multiple images
router.get('/', getProducts); // Get all products (with optional filters)
router.get('/:id', getProductById); // Get product by ID
router.put('/:id', upload.array('images', 5), updateProduct); // Update product
router.delete('/:id', deleteProduct); // Delete product

export default router;

