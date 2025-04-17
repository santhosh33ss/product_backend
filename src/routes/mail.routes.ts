import express from 'express';
import { sendWelcomeMail } from '../services/mailservices';



const router = express.Router();
router.post('/send-mail', async (req, res) => {
  try {
    console.log(' req.body',  req.body)
    const { email, name } = req.body;

    await sendWelcomeMail(email, name);

    res.status(200).json({ message: 'Mail sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send mail' });
  }
});

export default router;
