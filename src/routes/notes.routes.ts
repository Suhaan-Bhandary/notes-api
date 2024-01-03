import { Router } from 'express';
import { notesController } from '../controller';

const router = Router();

router.get('', notesController.getNotes);
router.get('/search', notesController.searchNotes);
router.get('/:id', notesController.getNoteById);

router.post('', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

router.post('/:id/share', notesController.shareNote);

export default router;
