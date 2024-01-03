import { Router } from 'express';
import { notesController } from '../controller';

const router = Router();

router.get('', notesController.getNotes);
router.get('/:id', notesController.getNoteById);

router.post('', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deteleNote);

router.post('/:id/share', notesController.shareNote);
router.get('/search?q=:query', notesController.searchNotes);

export default router;
