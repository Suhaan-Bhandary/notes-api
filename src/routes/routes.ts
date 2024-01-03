import { Router } from 'express';
import isUserAuthenticated from '../middleware/isUserAuthenticated';
import authRouter from './auth.routes';
import notesRouter from './notes.routes';

const router = Router();

router.use('/auth', authRouter);

// Using middleware here as all the notes routes require auth
router.use('/notes', isUserAuthenticated, notesRouter);

export default router;
