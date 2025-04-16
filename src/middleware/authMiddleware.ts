// // src/middleware/auth.ts
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };


// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
