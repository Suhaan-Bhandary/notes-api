import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('email', 'text', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('password', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('note')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .execute();

  await db.schema
    .createIndex('text-search-index-title-and-description')
    .on('note')
    .using('gin')
    .expression(sql`lower(title)`)
    .expression(sql`lower(description)`)
    .execute();

  await db.schema
    .createTable('note_shared')
    .addColumn('is_creator', 'boolean', (col) => col.defaultTo(true))
    .addColumn('user_email', 'text', (col) =>
      col.references('user.email').onDelete('cascade').notNull(),
    )
    .addColumn('note_id', 'serial', (col) =>
      col.references('note.id').onDelete('cascade').notNull(),
    )
    .addPrimaryKeyConstraint('note_shared_pk', ['user_email', 'note_id'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('note').execute();
  await db.schema.dropTable('note_shared').execute();
  await db.schema
    .dropIndex('text-search-index-title-and-description')
    .execute();
}
