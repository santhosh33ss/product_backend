// src/app.ts
import express from 'express';
import userRoutes from './routes/user.routes';
// app.use('/api/users/profile', protect);

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

export default app;
