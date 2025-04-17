import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  triggerMail,
  updateProduct,
} from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

// Protected routes
router.post('/emails', triggerMail); // up to 5 images
router.post('/', authMiddleware, upload.array('images', 5), createProduct); // up to 5 images
router.get('/', authMiddleware , getProducts);
router.get('/:id', authMiddleware , getProductById);
router.put('/:id', authMiddleware, upload.array('images', 5), updateProduct);;
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
