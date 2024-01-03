import { Request, Response } from 'express';

export const signUp = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'SignUp' });
};

export const login = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Login' });
};
