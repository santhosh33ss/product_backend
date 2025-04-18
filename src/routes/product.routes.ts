
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





// import { Router } from 'express';
// import productController from '../controllers/product.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';
// import { upload } from '../middlewares/upload.middleware';

// class ProductRoutes {
//   public router: Router;

//   constructor() {
//     this.router = Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.post('/emails', productController.triggerMail);
//     this.router.post('/', authMiddleware, upload.array('images', 5), productController.createProduct);
//     this.router.get('/', authMiddleware, productController.getProducts);
//     this.router.get('/:id', authMiddleware, productController.getProductById);
//     this.router.put('/:id', authMiddleware, upload.array('images', 5), productController.updateProduct);
//     this.router.delete('/:id', authMiddleware, productController.deleteProduct);
//   }

//   public getRouter(): Router {
//     return this.router;
//   }
// }

// export default new ProductRoutes().getRouter();




