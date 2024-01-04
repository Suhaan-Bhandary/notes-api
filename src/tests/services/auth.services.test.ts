import bcrypt from 'bcryptjs';
import { db } from '../../db/db';
import { authService } from '../../services';

describe('Auth Service', () => {
  afterEach(async () => {
    await db.deleteFrom('user').execute();
  });

  // Test
  describe('createUser', () => {
    test('New and Valid User', async () => {
      let user = {
        email: 'test@gmail.com',
        name: 'test',
        password: 'test',
      };

      const hashPassword = await bcrypt.hash(user.password, 12);
      user = {
        ...user,
        password: hashPassword,
      };

      await authService.createUser(user);

      // Check if user is inserted in db
      expect(async () => {
        await db
          .selectFrom('user')
          .where('email', '=', user.email)
          .executeTakeFirstOrThrow();
      }).resolves;
    });

    test('Duplicate user Email', async () => {
      let user = {
        email: 'test@gmail.com',
        name: 'test',
        password: 'test',
      };

      const hashPassword = await bcrypt.hash(user.password, 12);
      user = {
        ...user,
        password: hashPassword,
      };

      await authService.createUser(user);

      // Check if user is inserted in db
      expect(async () => {
        await authService.createUser(user);
      }).rejects.toThrow();
    });
  });

  describe('getUserPassword', () => {
    test('check the password matches with the original', async () => {
      let user = {
        email: 'test@gmail.com',
        name: 'test',
        password: 'test',
      };

      const hashPassword = await bcrypt.hash(user.password, 12);
      user = {
        ...user,
        password: hashPassword,
      };

      await authService.createUser(user);
      const password = await authService.getUserPassword(user.email);

      expect(password).toBe(user.password);
    });
  });
});
