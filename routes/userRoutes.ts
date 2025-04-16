import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import auth from '../middleware/au_middleware';
import { someAsyncController } from '../controllers/productcontroller';

const router = express.Router();
router.get('/', someAsyncController);
// @route   POST /api/auth/register
// @desc    Register user
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auth/user
// @desc    Get logged in user
router.get('/user', auth, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
