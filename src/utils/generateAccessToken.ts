import jwt from 'jsonwebtoken';
import { AccessToken } from '../types/accessToken';

export const generateAccessToken = (email: string) => {
  if (!process.env['SECRET_KEY']) {
    console.log('JWT key is undefined');
    throw new Error('JWT SECRET_KEY key not defined');
  }

  const tokenBody: AccessToken = { email };
  const token = jwt.sign(tokenBody, process.env['SECRET_KEY']);

  if (!token) throw new Error('Could not generate forgot password token');
  return token;
};
