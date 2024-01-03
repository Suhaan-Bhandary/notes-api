import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { NewNote } from '../db/types/note';
import { notesService } from '../services';
import { AccessToken } from '../types/accessToken';
import {
  BadRequestError,
  InternalServerError,
  SuccessResponse,
} from '../utils/apiResponse';
import { createNoteValidation } from '../validators/auth/createNote.validator';

export const getNotes = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'getNotes' });
};

export const getNoteById = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'getNoteById' });
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

export const deteleNote = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'deteleNote' });
};

export const shareNote = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'shareNote' });
};
