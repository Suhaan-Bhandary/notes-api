import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { NoResultError } from 'kysely';
import { User } from '../db/types/user';
import { isDuplicateKeyError } from '../errors/db.errors';
import { authService } from '../services';
import {
  BadRequestError,
  InternalServerError,
  SuccessResponse,
  UnauthorizedError,
} from '../utils/apiResponse';
import { generateAccessToken } from '../utils/generateAccessToken';
import { loginValidation } from '../validators/auth/login.validator';
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
    await authService.createUser(user);

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

export const login = async (req: Request, res: Response) => {
  try {
    // Validating the body
    const user = (await loginValidation.validateAsync(req.body)) as {
      email: string;
      password: string;
    };

    // Get the user and compare the passwords
    const hashedPassword = await authService.getUserPassword(user.email);
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      hashedPassword,
    );

    if (!isPasswordCorrect) {
      return UnauthorizedError(res, {
        message: 'Incorrect email or password.',
      });
    }

    // Create a access token and send it to user
    const accessToken = generateAccessToken(user.email);

    return SuccessResponse(res, {
      accessToken,
      message: 'User LoggedIn successfully.',
    });
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return BadRequestError(res, { message: error.message });
    }

    if (error instanceof NoResultError) {
      return BadRequestError(res, {
        message: 'Incorrect email or password.',
      });
    }

    return InternalServerError(res, { message: 'Something went wrong.' });
  }
};
