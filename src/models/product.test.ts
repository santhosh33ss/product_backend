import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from './product.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany({});
});

describe('Product Model Test', () => {
  it('should create and save a product successfully', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 50,
      images: ['image1.jpg', 'image2.jpg'],
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.price).toBe(productData.price);
    expect(savedProduct.stock).toBe(productData.stock);
    expect(savedProduct.images).toEqual(expect.arrayContaining(productData.images));
  });

  it('should fail if required fields are missing', async () => {
    const product = new Product({ description: 'Only description' });

    try {
      await product.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        expect(error.errors.name).toBeDefined();
        expect(error.errors.price).toBeDefined();
        expect(error.errors.stock).toBeDefined();
      } else {
        throw error; // rethrow if it's an unexpected error
      }
    }
  });
});
