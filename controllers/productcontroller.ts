import { Request, Response } from 'express';
import Product from '../models/product';
import fs from 'fs';
import path from 'path';

// Create a product with single image
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, stock, createdBy } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      price,
      description,
      stock,
      image,
      createdBy,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a product with multiple images
export const createProductMultiple = async (req: Request, res: Response) => {
  try {
    const { name, price, description, stock, createdBy } = req.body;
    const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.filename) : [];

    const product = new Product({
      name,
      price,
      description,
      stock,
      images,
      createdBy,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all products with filters
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { name, stock, createdAt } = req.query;

    // Build filter object
    const filter: any = {};

    if (name) {
      filter.name = { $regex: new RegExp(name as string, 'i') }; // case-insensitive
    }

    if (stock) {
      filter.stock = parseInt(stock as string);
    }

    if (createdAt) {
      // Match documents with the same date (ignoring time)
      const date = new Date(createdAt as string);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      filter.createdAt = {
        $gte: date,
        $lt: nextDay,
      };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, stock } = req.body;
    const updateFields: any = { name, price, description, stock };

    if (req.files && Array.isArray(req.files)) {
      updateFields.images = req.files.map((file: Express.Multer.File) => file.filename);
    } else if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedProduct) return res.status(404).json({ msg: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Remove all image files
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img: string) => {
        const imgPath = path.join(__dirname, '../uploads', img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const someAsyncController = async (req: Request, res: Response) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json({ products });    // Respond with the products
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


