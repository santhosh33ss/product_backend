import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  stock: number;
  images: string[];
  createdAt: Date;
}
const productSchema = new mongoose.Schema<IProduct>({
  name: String,
  price: Number,
  description: String,
  stock: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: [String], // This is the correct field
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;


