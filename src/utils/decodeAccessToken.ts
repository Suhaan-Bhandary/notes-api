import jwt from 'jsonwebtoken';
import { AccessToken } from '../types/accessToken';

export const decodeAccessToken = (token: string) => {
  const SECRET_KEY = process.env['SECRET_KEY'];
  if (!SECRET_KEY) throw new Error('SECRET_KEY not Defined');

  return jwt.verify(token, SECRET_KEY) as AccessToken;
};
