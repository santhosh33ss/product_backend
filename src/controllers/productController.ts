import { Request, Response } from 'express';
import {Product }from '../models/product';

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    const images = req.files
      ? (req.files as Express.Multer.File[]).map(file => file.filename)
      : [];

    const product = new Product({ name, description, price, stock, images });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

// Read all products
export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    const images = req.files
      ? (req.files as Express.Multer.File[]).map(file => file.filename)
      : [];

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, $push: { images: { $each: images } } },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
