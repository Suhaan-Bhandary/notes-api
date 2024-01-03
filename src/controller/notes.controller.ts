import { Request, Response } from 'express';
import { SuccessResponse } from '../utils/apiResponse';

export const getNotes = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'getNotes' });
};

export const getNoteById = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'getNoteById' });
};

export const searchNotes = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'searchNotes' });
};

export const createNote = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'createNote' });
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
