import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { User } from '../db/types/user';
import { isDuplicateKeyError } from '../errors/db.errors';
import { createUser } from '../services/auth.services';
import {
  BadRequestError,
  InternalServerError,
  SuccessResponse,
} from '../utils/apiResponse';
import { singUpValidation } from '../validators/auth/signUp.validator';

export const signUp = async (req: Request, res: Response) => {
  try {
    // Validating the body
    let user = (await singUpValidation.validateAsync(req.body)) as User;

    // Hashing the password before storing it in database
    const hashPassword = await bcrypt.hash(user.password, 12);
    user = {
      ...user,
      password: hashPassword,
    };

    // Create the user in Database
    await createUser(user);

    return SuccessResponse(res, { message: 'User signed-up successfully.' });
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return BadRequestError(res, { message: error.message });
    }

    if (isDuplicateKeyError(error)) {
      return BadRequestError(res, { message: 'Email already present.' });
    }

    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};

export const login = (req: Request, res: Response) => {
  return SuccessResponse(res, { message: 'Login' });
};
