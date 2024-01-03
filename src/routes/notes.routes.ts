import { Router } from 'express';
import { notesController } from '../controller';

const router = Router();

router.get('/api/notes', notesController.getNotes);
router.get('/api/notes/:id', notesController.getNoteById);
router.post('/api/notes', notesController.searchNotes);
router.put('/api/notes/:id', notesController.createNote);
router.delete('/api/notes/:id', notesController.updateNote);
router.post('/api/notes/:id/share', notesController.deteleNote);
router.get('/api/search?q=:query', notesController.shareNote);

export default router;
