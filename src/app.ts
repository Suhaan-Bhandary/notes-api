import express from 'express';
import apiRouter from './routes/routes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRouter);

// Home Route
app.get('/', async (req, res) => {
  res.status(200).json({ name: 'Notes API' });
});

// Not found route
app.get('*', (req, res) => {
  return res.status(404).json({ message: 'API URL is not valid' });
});

export default app;
