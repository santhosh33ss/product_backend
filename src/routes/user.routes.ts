// import { Router } from 'express';
// import userController from '../controllers/user.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';

// class UserRoutes {
//   public router: Router;

//   constructor() {
//     this.router = Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.post('/register', userController.registerUser);
//     this.router.post('/login', userController.loginUser);
//     this.router.get('/profile', authMiddleware, userController.getUserProfile);
//   }

//   public getRouter(): Router {
//     return this.router;
//   }
// }

// export default new UserRoutes().getRouter();






// src/routes/user.routes.ts
import express from 'express';
// import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
export default router;



