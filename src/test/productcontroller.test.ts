import { Request, Response, NextFunction } from 'express';
import * as productController from '../controllers/product.controller';
import Product from '../models/product.model';
// import { triggerMail } from '../controllers/product.controller';
// import nodemailer from 'nodemailer';

jest.mock('../models/product.model');
// jest.mock('nodemailer');

describe('Product Controller', () => {
  let req = {} as Request;
  let res = {} as Response;
  let next = jest.fn() as NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();
  });



  describe('createProduct', () => {
    it('should create a product and return 201', async () => {
      req.body = {
        name: 'Test Product',
        description: 'Desc',
        price: 100,
        stock: 10
      };
      req.files = [
        { filename: 'img1.png' },
        { filename: 'img2.png' }
      ] as Express.Multer.File[];

      const mockProduct = {
        ...req.body,
        images: ['img1.png', 'img2.png']
      };

      (Product.create as jest.Mock).mockResolvedValue(mockProduct);

      await productController.createProduct(req, res);

      expect(Product.create).toHaveBeenCalledWith({
        ...req.body,
        images: ['img1.png', 'img2.png']
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 500 if error occurs', async () => {
      (Product.create as jest.Mock).mockRejectedValue(new Error('DB error'));

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating product',
        error: expect.any(Error)
      });
    });
  });

  describe('getProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ name: 'P1' }, { name: 'P2' }];
      req.query = {};
      (Product.find as jest.Mock).mockResolvedValue(mockProducts);

      await productController.getProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should return product by ID', async () => {
      const mockProduct = { name: 'Test' };
      req.params = { id: '123' };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);

      await productController.getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 404 if product not found', async () => {
      req.params = { id: '123' };
      (Product.findById as jest.Mock).mockResolvedValue(null);

      await productController.getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });
  });

  describe('updateProduct', () => {
    it('should update product and return updated doc', async () => {
      req.params = { id: '123' };
      req.body = { name: 'Updated' };
      const updatedProduct = { name: 'Updated' };

      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product and return success', async () => {
      req.params = { id: '123' };
      const deletedProduct = { name: 'Deleted' };

      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedProduct);

      await productController.deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Product deleted successfully'
      });
    });

    it('should return 404 if product not found', async () => {
      req.params = { id: '123' };
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await productController.deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Product not found'
      });
    });
  });
});

