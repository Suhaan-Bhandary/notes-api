import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { NewNote } from '../db/types/note';
import { notesService } from '../services';
import { AccessToken } from '../types/accessToken';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  SuccessResponse,
  UnauthorizedError,
} from '../utils/apiResponse';
import { createNoteValidation } from '../validators/auth/createNote.validator';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    // Find notes
    const notes = await notesService.getNotes(userEmail);

    return SuccessResponse(res, { message: 'User Notes.', notes });
  } catch (error) {
    console.log(error);
    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    const noteId = parseInt(req.params['id']);

    console.log(req.params['id'], userEmail);

    // Get if the user is allowed to see the note, if yes get the note
    const note = await notesService.getNote(noteId, userEmail);

    if (!note) {
      return NotFoundError(res, {
        message: 'Note not Found or is not shared.',
      });
    }

    return SuccessResponse(res, { message: 'Note Found', note });
  } catch (error) {
    console.log(error);
    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};

export const searchNotes = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'searchNotes' });
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    // Validating the body
    const note = (await createNoteValidation.validateAsync(
      req.body,
    )) as NewNote;

    // Create the note in Database
    await notesService.createNote(note, userEmail);

    return SuccessResponse(res, { message: 'Note created successfully.' });
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return BadRequestError(res, { message: error.message });
    }

    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};

export const updateNote = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'updateNote' });
};

// Check if note available, check if user is owner
export const deteleNote = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    const noteId = parseInt(req.params['id']);

    const isCreatorRes = await notesService.isCreator(noteId, userEmail);
    if (!isCreatorRes) {
      return NotFoundError(res, { message: 'Note doesnot exits' });
    }

    if (!isCreatorRes.is_creator) {
      return UnauthorizedError(res, {
        message: 'Unauthorized, Cannot delete the post.',
      });
    }

    // Get if the user is allowed to see the note, if yes get the note
    await notesService.deleteNote(noteId);
    return SuccessResponse(res, { message: 'Deleted note successfully' });
  } catch (error) {
    console.log(error);
    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};

export const shareNote = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'shareNote' });
};
