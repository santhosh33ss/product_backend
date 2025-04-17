// src/cron/cronJobs.ts
import cron from 'node-cron';
import { sendWelcomeMail } from '../services/mailservices';

export const startCronJobs = () => {
  cron.schedule('*/1 * * * *', async () => {
    console.log('running for every minutes')
    
  });
};

export const emailReminderJob = () => {
  cron.schedule('0 9 * * *', () => {
    console.log('it will daily at 9:00 AM');
    
  });
};


export const databaseBackupJob = () => {
  cron.schedule('0 0 * * *', () => {
    console.log(' Running DB backup at midnight');
    
  });
};
