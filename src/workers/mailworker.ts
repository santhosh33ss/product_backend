import { mailQueue } from '../queues/mailQueues';
import { sendWelcomeMail } from '../services/mailservices';

mailQueue.process(async (job) => {
  const { email, name } = job.data;
  await sendWelcomeMail(email, name);

  console.log(`Mail sent to ${email}`);
});
  
