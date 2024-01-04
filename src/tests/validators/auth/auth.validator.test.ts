import { describe, expect, test } from '@jest/globals';
import { loginValidation } from '../../../validators/auth/login.validator';
import { singUpValidation } from '../../../validators/auth/signUp.validator';

describe('Auth Validator', () => {
  describe('Signup', () => {
    test('Correct data', async () => {
      expect(async () => {
        await singUpValidation.validateAsync({
          name: 'test',
          email: 'test@gmail.com',
          password: 'test',
        });
      }).resolves;
    });

    test('Incorrect data', async () => {
      expect(async () => {
        await singUpValidation.validateAsync({
          name: 'test',
          email: 'test@gmail',
          password: 'test',
        });
      }).rejects.toThrow();
    });

    test('Incorrect typing', async () => {
      expect(async () => {
        await singUpValidation.validateAsync({
          name: 10,
          email: 'test@gmail.com',
          password: 'test',
        });
      }).rejects.toThrow();
    });

    test('Empty data', async () => {
      expect(async () => {
        await singUpValidation.validateAsync({});
      }).rejects.toThrow();
    });
  });

  describe('Login', () => {
    test('Correct Data', async () => {
      expect(async () => {
        await loginValidation.validateAsync({
          email: 'test@gmail.com',
          password: 'test',
        });
      }).resolves;
    });

    test('Incorrect Email', async () => {
      expect(async () => {
        await loginValidation.validateAsync({
          email: 'test@gmail',
          password: 'test',
        });
      }).rejects.toThrow();
    });

    test('Incorrect typing', async () => {
      expect(async () => {
        await loginValidation.validateAsync({
          email: 10,
          password: 'test',
        });
      }).rejects.toThrow();
    });

    test('Empty data', async () => {
      expect(async () => {
        await loginValidation.validateAsync({});
      }).rejects.toThrow();
    });
  });
});
