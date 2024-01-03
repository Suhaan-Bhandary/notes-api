import { Request, Response } from 'express';
import { SuccessResponse } from '../utils/apiResponse';

export const signUp = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'SignUp' });
};

export const login = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'Login' });
};
