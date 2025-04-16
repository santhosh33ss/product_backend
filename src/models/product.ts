import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  createdAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
