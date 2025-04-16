import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import {upload }from '../middleware/upload';
import {authMiddleware} from '../middleware/authMiddleware';
const router = express.Router();

// Apply authentication middleware
router.use(authMiddleware);

// Create product with single or multiple images
router.post('/', upload.array('images', 5), createProduct);

// Get all products
router.get('/', getAllProducts);

// Get filtered products (by name, created date, stock)
// router.get('/filter', filterProducts);

// Get product by ID
router.get('/:id', getProductById);

// Update product
router.put('/:id', upload.array('images', 5), updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

export default router;
