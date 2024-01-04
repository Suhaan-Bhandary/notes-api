import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { NewNote, NoteUpdate } from '../db/types/note';
import { isForeignKeyError } from '../errors/db.errors';
import { notesService } from '../services';
import { AccessToken } from '../types/accessToken';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  SuccessResponse,
  UnauthorizedError,
} from '../utils/apiResponse';
import { createNoteValidation } from '../validators/notes/createNote.validator';
import { shareNoteValidation } from '../validators/notes/shareNote.validator';
import { updateNoteValidation } from '../validators/notes/updateNote.validator';

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

export const searchNotes = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    const query = req.query['q'];
    if (typeof query !== 'string') {
      return BadRequestError(res, { message: 'Please provide a valid query' });
    }

    // Find notes
    const notes = await notesService.getNotesByQuery(query, userEmail);
    return SuccessResponse(res, { message: 'Notes', notes });
  } catch (error) {
    console.log(error);
    return InternalServerError(res, { message: 'Something went wrong.' });
  }
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

export const updateNote = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    const noteId = parseInt(req.params['id']);

    // Validating the body
    const note = (await updateNoteValidation.validateAsync(
      req.body,
    )) as NoteUpdate;

    const isCreatorRes = await notesService.isCreator(noteId, userEmail);
    if (!isCreatorRes) {
      return NotFoundError(res, { message: "Note doesn't exists" });
    }

    if (!isCreatorRes.is_creator) {
      return UnauthorizedError(res, {
        message: 'Unauthorized, Cannot Update the post.',
      });
    }

    // Create the note in Database
    await notesService.updateNote(noteId, note);

    return SuccessResponse(res, { message: 'Note updated successfully.' });
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return BadRequestError(res, { message: error.message });
    }

    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};

// Check if note available, check if user is owner
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;

    const noteId = parseInt(req.params['id']);

    const isCreatorRes = await notesService.isCreator(noteId, userEmail);
    if (!isCreatorRes) {
      return NotFoundError(res, { message: "Note doesn't exists" });
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

export const shareNote = async (req: Request, res: Response) => {
  try {
    const accessTokenData = res.locals as AccessToken;
    const userEmail = accessTokenData.email;
    const noteId = parseInt(req.params['id']);

    // Validating the body
    const bodyData = (await shareNoteValidation.validateAsync(req.body)) as {
      shareEmail: string;
    };

    if (bodyData.shareEmail === userEmail) {
      return BadRequestError(res, {
        message: 'Cannot share the note to the creator itself.',
      });
    }

    const isCreatorRes = await notesService.isCreator(noteId, userEmail);
    if (!isCreatorRes) {
      return NotFoundError(res, { message: "Note doesn't exists" });
    }

    if (!isCreatorRes.is_creator) {
      return UnauthorizedError(res, {
        message: 'Unauthorized, Cannot Share the post.',
      });
    }

    // Create the note in Database
    await notesService.shareNote(noteId, bodyData.shareEmail);

    return SuccessResponse(res, { message: 'Note shared successfully.' });
  } catch (error) {
    console.log(error);

    if (isForeignKeyError(error)) {
      return BadRequestError(res, {
        message: "Cannot Share, user with the email doesn't exists.",
      });
    }

    if (error instanceof ValidationError) {
      return BadRequestError(res, { message: error.message });
    }

    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};
