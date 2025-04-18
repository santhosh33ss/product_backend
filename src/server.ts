import './cron/cleanupTask'; // Ensure cron jobs are initialized on server start
// import app from './app';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import path from 'path';
// import './cronJobs/emailScheduler';
import bodyParser from 'body-parser';
import mailRoutes from './routes/mail.routes';
import { startCronJobs ,
    emailReminderJob,
    databaseBackupJob
} from './cron/cronjobs';

// startCronJobs();
// databaseBackupJob();
// emailReminderJob();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/emails', mailRoutes);

// DB Connect
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));


  //json test file
  // "test": "echo \"Error: no test specified\" && exit 1",

