import { db } from '../db/db';
import { User } from '../db/types/user';

export const createUser = async (user: User) => {
  return db.insertInto('user').values(user).execute();
};

export const getUserPassword = async (email: string) => {
  return db
    .selectFrom('user')
    .select('password')
    .where('email', '=', email)
    .executeTakeFirstOrThrow()
    .then((user) => user.password);
};
