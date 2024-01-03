import { Insertable, Selectable, Updateable } from 'kysely';

// User Table
export interface UserTable {
  name: string;
  email: string;
  password: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
