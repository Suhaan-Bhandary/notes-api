import { db } from '../db/db';
import { NewNote } from '../db/types/note';

export const createNote = async (note: NewNote, email: string) => {
  // create the note
  const note_id = await db
    .insertInto('note')
    .values(note)
    .returning('id')
    .executeTakeFirstOrThrow()
    .then((note) => note.id);

  // Added user to note_shared table
  await db
    .insertInto('note_shared')
    .values({
      note_id,
      user_email: email,
      is_creator: true,
    })
    .executeTakeFirstOrThrow();
};

export const getNotes = async (email: string) => {
  return await db
    .selectFrom('note_shared')
    .innerJoin('note', 'note.id', 'note_shared.note_id')
    .select('note.id')
    .select('note.title')
    .select('note.description')
    .select('is_creator')
    .where('user_email', '=', email)
    .execute();
};

export const getNote = async (noteId: number, email: string) => {
  return await db
    .selectFrom('note_shared')
    .innerJoin('note', 'note.id', 'note_shared.note_id')
    .select('note.id')
    .select('note.title')
    .select('note.description')
    .select('is_creator')
    .where((eb) => eb('user_email', '=', email).and('note.id', '=', noteId))
    .executeTakeFirst();
};
