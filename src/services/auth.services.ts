import { db } from '../db/db';
import { User } from '../db/types/user';

export const createUser = async (user: User) => {
  return db.insertInto('user').values(user).execute();
};
