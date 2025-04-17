import Queue from 'bull';
import dotenv from 'dotenv';

dotenv.config();

interface MailJob {
  email: string;
  name: string;
}

// Create the Bull queue using Redis URL
export const mailQueue = new Queue<MailJob>('mailQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});
