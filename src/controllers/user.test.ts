// src/controllers/user.controller.test.ts

import { loginUser, registerUser } from './user.controller';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailQueue } from '../queues/mailQueues';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../queues/mailQueues');

describe('User Controller - registerUser', () => {
    
  const mockRequest = {
    body: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {

    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (User.create as jest.Mock).mockResolvedValue({
      _id: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
    });
    (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

    await registerUser(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
    });
    expect(mailQueue.add).toHaveBeenCalledWith({
      email: 'john@example.com',
      name: 'John Doe',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      _id: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
      token: 'mockedToken',
    });
  });
});






// describe('User Controller - loginUser', () => {
//     let req: Partial<Request>;
//     let res: Partial<Response>;
//     let statusMock: jest.Mock;
//     let jsonMock: jest.Mock;
  
//     beforeEach(async () => {
    
//       statusMock = jest.fn().mockReturnThis();
//       jsonMock = jest.fn();
//       req = {
//         body: {
//           email: 'test@example.com',
//           password: 'password123',
//         },
//       };
//       res = {
//         status: statusMock,
//         json: jsonMock,
//       };
//     });
  
//     it('should return 200 and user data on successful login', async () => {
//       // Mock user found
//       const mockUser = {
//         _id: 'user123',
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashedpassword',
//       };
//       (User.findOne as jest.Mock).mockResolvedValue(mockUser);
//       (bcrypt.compare as jest.Mock).mockResolvedValue(true);
//       (jwt.sign as jest.Mock).mockReturnValue('mockToken123');
  
//       await loginUser(req as Request, res as Response);
  
//       expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//       expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
//       expect(jsonMock).toHaveBeenCalledWith({
//         _id: mockUser._id,
//         name: mockUser.name,
//         email: mockUser.email,
//         token: 'mockToken123',
//       });
//       expect(statusMock).toHaveBeenCalledWith(200);
//     });
  
//     it('should return 401 if user not found or password mismatch', async () => {
//       (User.findOne as jest.Mock).mockResolvedValue(null);
  
//       await loginUser(req as Request, res as Response);
  
//       expect(statusMock).toHaveBeenCalledWith(401);
//       expect(jsonMock).toHaveBeenCalledWith({ message: 'Invalid email or password' });
//     });
  
//     it('should return 500 if server error occurs', async () => {
//       (User.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));
  
//       await loginUser(req as Request, res as Response);
  
//       expect(statusMock).toHaveBeenCalledWith(500);
//       expect(jsonMock).toHaveBeenCalledWith({ message: 'Server error' });
//     });
      
//   });


