import cron from 'node-cron';


export const emailReminderJob = () => {
  cron.schedule('0 9 * * *', () => {
    console.log('📬 Sending reminder emails at 9:00 AM');
    // Logic: Send appointment/subscription/inactivity emails here
  });
};

// cron/databaseBackup.ts
export const databaseBackupJob = () => {
  cron.schedule('0 0 * * *', () => {
    console.log('💾 Running DB backup at midnight');
    // Logic: Export database, save to disk or upload to cloud
  });
};


