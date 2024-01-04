import { db } from '../db/db';
import { NewNote, NoteUpdate } from '../db/types/note';

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

export const isCreator = async (noteId: number, email: string) => {
  return await db
    .selectFrom('note_shared')
    .select('is_creator')
    .where((eb) => eb('note_id', '=', noteId).and('user_email', '=', email))
    .executeTakeFirst();
};

export const deleteNote = async (noteId: number) => {
  return await db
    .deleteFrom('note')
    .where('id', '=', noteId)
    .executeTakeFirstOrThrow();
};

export const updateNote = async (noteId: number, note: NoteUpdate) => {
  return await db
    .updateTable('note')
    .set(note)
    .where('note.id', '=', noteId)
    .executeTakeFirstOrThrow();
};

export const shareNote = async (noteId: number, shareEmail: string) => {
  return await db
    .insertInto('note_shared')
    .values({
      is_creator: false,
      note_id: noteId,
      user_email: shareEmail,
    })
    .executeTakeFirstOrThrow();
};

export const getNotesByQuery = async (query: string, email: string) => {
  const lowerQuery = query.toLowerCase();
  return await db
    .selectFrom('note_shared')
    .innerJoin('note', 'note.id', 'note_shared.note_id')
    .select('note.id')
    .select('note.title')
    .select('note.description')
    .select('is_creator')
    .where('user_email', '=', email)
    .where((eb) =>
      eb('note.title', 'like', '%' + lowerQuery + '%').or(
        'note.description',
        'like',
        '%' + lowerQuery + '%',
      ),
    )
    .execute();
};
