import { Router } from 'express';
import { authLimiter, nonAuthLimiter } from '../config/rate-limiter';
import isUserAuthenticated from '../middleware/isUserAuthenticated';
import authRouter from './auth.routes';
import notesRouter from './notes.routes';

const router = Router();

router.use('/auth', nonAuthLimiter);
router.use('/auth', authRouter);

// Using middleware here as all the notes routes require auth
router.use('/notes', authLimiter);
router.use('/notes', authLimiter, isUserAuthenticated, notesRouter);

export default router;
