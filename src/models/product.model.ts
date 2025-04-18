import mongoose, { Document, Schema } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  createdAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;







// import mongoose, { Document, Schema, Model } from 'mongoose';

// export interface ProductDocument extends Document {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   images: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// const productSchema = new Schema<ProductDocument>(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     stock: { type: Number, required: true },
//     images: [{ type: String }],
//   },
//   { timestamps: true }
// );

// class ProductClass {
//   // Add any custom instance or static methods here if needed in future
// }

// productSchema.loadClass(ProductClass);

// const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

// export default ProductModel;




