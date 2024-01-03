import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/apiResponse';
import { decodeAccessToken } from '../utils/decodeAccessToken';

const isUserAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO: Get the token from the user
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return UnauthorizedError(res, { message: 'User not Authenticated' });
  }

  try {
    // Verify the token
    const accessTokenData = decodeAccessToken(token);

    // Adding token data to req
    req.body.accessTokenData = accessTokenData;

    return next();
  } catch (err) {
    return UnauthorizedError(res, { message: 'User not Authenticated' });
  }
};

export default isUserAuthenticated;
