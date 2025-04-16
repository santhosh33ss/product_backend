

const Product = require('../models/product');
const fs = require('fs');
const path = require('path');


// Create a product with single image

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, createdBy } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      price,
      description,
      stock,
      image ,
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
const createProductMultiple = async (req, res) => {
  try {
    const { name, price, description, stock, createdBy } = req.body;
    const images = req.files ? req.files.map((file) => file.filename) : [];

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

// Get all products with optional filters
const getProducts= async (req, res) => {
  try {
    const { name, createdDate, stockAvailable } = req.query;

    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (createdDate) {
      const start = new Date(createdDate);
      const end = new Date(createdDate);
      end.setDate(end.getDate() + 1);
      filter.createdAt = { $gte: start, $lt: end };
    }
    if (stock !== undefined) {
        if (stock === 'true') {
          filter.stock = { $gt: 0 };
        } else if (stock === 'false') {
          filter.stock = { $lte: 0 };
        }
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const updateFields = { name, price, description, stock };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ msg: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Remove image(s) from filesystem
    if (product.image) {
      const imagePath = path.join(__dirname, '../uploads', product.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
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

module.exports = {
  createProduct,
  createProductMultiple,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
