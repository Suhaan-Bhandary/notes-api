import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/apiResponse';

const isUserAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO: Get the token from the user
  const token = 'token';

  if (!token) {
    return UnauthorizedError(res, { message: 'User not Authenticated' });
  }

  try {
    // TODO: Verify the token
    return next();
  } catch (err) {
    return UnauthorizedError(res, { message: 'User not Authenticated' });
  }
};

export default isUserAuthenticated;
