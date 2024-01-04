import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types/database';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env['DATABASE'],
    host: process.env['DATABASE_HOST'],
    password: process.env['DATABASE_PASSWORD'],
    user: process.env['DATABASE_USER'],
    port: process.env['DATABASE_PORT'],
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
