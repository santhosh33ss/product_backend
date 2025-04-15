const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [
    {
      type: String // stores image file path or URL
    }
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
