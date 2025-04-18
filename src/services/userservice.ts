// // tests/authMiddleware.test.ts
// import { Request, Response, NextFunction } from 'express';
// import { authenticate } from '../middlewares/auth.middleware';

// describe('Auth Middleware', () => {
//   it('should call next() if authorization header is present', () => {
//     const req = { headers: { authorization: 'Bearer token' } } as Request;
//     const res = {} as Response;
//     const next = jest.fn() as NextFunction;

//     authenticate(req, res, next);

//     expect(next).toHaveBeenCalled();
//   });

//   it('should return 401 if authorization header is missing', () => {
//     const req = { headers: {} } as Request;
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
//     const next = jest.fn() as NextFunction;

//     authenticate(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
//   });
// });