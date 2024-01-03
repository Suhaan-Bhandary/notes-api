import { Request, Response } from 'express';

export const getNotes = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'getNotes' });
};

export const getNoteById = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'getNoteById' });
};

export const searchNotes = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'searchNotes' });
};

export const createNote = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'createNote' });
};

export const updateNote = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'updateNote' });
};

export const deteleNote = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'deteleNote' });
};

export const shareNote = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'shareNote' });
};
