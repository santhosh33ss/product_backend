// // cronJobs/emailScheduler.ts

// import cron from 'node-cron';
// import { sendWelcomeEmail } from '../utils/mailer';
// import { User } from '../models/user.model';

// // Schedule: Every day at 9 AM
// cron.schedule('0 9 * * *', async () => {
//   console.log('🔔 Running scheduled mail trigger...');

//   try {
//     // Fetch users who registered in the last 24 hours (for example)
//     const since = new Date();
//     since.setDate(since.getDate() - 1);

//     const users = await User.find({ createdAt: { $gte: since } });

//     if (users.length === 0) {
//       console.log('📭 No new users to send email to.');
//       return;
//     }

//     for (const user of users) {
//       await sendWelcomeEmail(user.email, user.name);
//     }

//     console.log(`📧 Sent welcome emails to ${users.length} user(s).`);
//   } catch (error) {
//     console.error('❌ Error sending scheduled emails:', error);
//   }
// });
