import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../app';
import { db } from '../../db/db';
import { User } from '../../db/types/user';
import { authService } from '../../services';
import { createUser } from '../../services/auth.services';

describe('Auth Controller', () => {
  afterEach(async () => {
    await db.deleteFrom('user').execute();
  });

  describe('signup', () => {
    test('should sign up a new user', async () => {
      const newUser: User = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(newUser);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User signed-up successfully.');
    });

    test('should handle validation error during sign-up', async () => {
      const invalidUser = {
        name: 'test',
        email: 'test@gmail.com',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(invalidUser);
      expect(response.status).toBe(400);
    });

    test('should handle duplicate email error during sign-up', async () => {
      jest.spyOn(authService, 'createUser').mockImplementation(() => {
        throw { code: '23505' };
      });

      const duplicateUser = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(duplicateUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already present.');

      jest.restoreAllMocks();
    });

    test('should handle internal server error during sign-up (database failure)', async () => {
      jest.spyOn(authService, 'createUser').mockImplementation(() => {
        throw new Error('Database connection failed'); // Simulate a database failure
      });

      const newUser = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(newUser);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Something went wrong.');

      jest.restoreAllMocks();
    });
  });

  describe('login', () => {
    test('should log in an existing user successfully', async () => {
      const existingUser = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
      };

      // Creates user in the test db
      const hashPassword = await bcrypt.hash(existingUser.password, 12);
      await createUser({
        ...existingUser,
        password: hashPassword,
      });

      const response = await request(app).post('/api/auth/login').send({
        email: existingUser.email,
        password: existingUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User LoggedIn successfully.');
    });

    test('should handle validation error during login', async () => {
      // Not providing email in the login data
      const invalidLoginData = {
        password: 'test',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidLoginData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('"email" is required');
    });

    test('should handle incorrect email or password during login', async () => {
      // Below is incorrect login detail
      const incorrectLoginData = {
        email: 'incorrect@example.com',
        password: 'incorrectPassword',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(incorrectLoginData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Incorrect email or password.');
    });

    test('should handle internal server error during login (database failure)', async () => {
      jest.spyOn(authService, 'getUserPassword').mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      const loginUser = {
        email: 'test@gmail.com',
        password: 'test',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginUser);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Something went wrong.');

      jest.restoreAllMocks();
    });
  });
});
