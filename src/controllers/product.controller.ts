import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model';
import { sendWelcomeMail } from 'services/mailservices';
import nodemailer from 'nodemailer';

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;

    const imageFiles = req.files as Express.Multer.File[];
    const imagePaths = imageFiles?.map((file) => file.filename) || [];

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images: imagePaths,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};
// Create node mailer
export const triggerMail = async (req: Request, res: Response) => {
  try {
    console.log(' req.body',  req.body)
    const { email, name } = req.body;

    try {
           const transporter = nodemailer.createTransport({
               host: 'sandbox.smtp.mailtrap.io',
               port: 2525,
               secure: false,
               auth: {
                   user: '6ce139dcaaf787',
                   pass: '0959fd71015547'
               }
           });
       
           const mailOptions = {
               from: process.env.MAIL_USER,
               to: email,
               subject: 'Welcome to Our App!',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
               html: `
             <h2>Hi ${name} HOW ARE YOU,</h2>
             <p>Welcome to our application! 🎉</p>
             <p>We’re glad to have you on board.</p>
           `,
           attachments: [
            {
              filename: 'welcome.txt',
              content: `Welcome ${name}! Thanks for joining us.`
            },
            {
              filename: 'welcome.txt',
              content: `${name}! Thanks for joining with us.`
            },
            
          ]
           };
       
           await transporter.sendMail(mailOptions);
       } catch (error) {
           console.log(error)
       }

    res.status(200).json({ message: 'Mail sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send mail' });
  }
};

// Get All Products

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, startDate, endDate, Stock } = req.query;
  
      const filter: any = {};
  
      if (name) {
        filter.name = { $regex: new RegExp(name as string, 'i') }; // case-insensitive search
      }
  
      if (req.query.createdAt) {
        const date = new Date(req.query.createdAt as string);
      
        // Set the next day to get all records created *on* this date
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
      
        filter.createdAt = {
          $gte: date,
          $lt: nextDay,
        };
      }
      
  
      if (Stock !== undefined) {
        if (Stock === 'true') {
          filter.stock = { $gt: 0 }; // Products in stock
        } else if (Stock === 'false') {
          filter.stock = { $lte: 0 }; // Out of stock
        }
      }
      
  
      const products = await Product.find(filter);
     res.status(200).json(products);
    } catch (error) {
     res.status(500).json({ message: 'Error fetching products', error });
    }
  };
// export const getProducts = async (_req: Request, res: Response) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error });
//   }
// };

// Get Single Product
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      // Fetch product logic here
      const product = await Product.findById(productId);
  
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (error) {
      next(error); // or handle directly: res.status(500).json({ error: 'Server error' });
    }
  };

// Update Product
export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const productId = req.params.id;
  
      // Example: handle updates here
      const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
  
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (error) {
      next(error); // optional: res.status(500).json({ error: 'Server error' });
    }
  };

// Delete Product
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const productId = req.params.id;
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error); // or handle directly with res.status(500)
    }
  };
