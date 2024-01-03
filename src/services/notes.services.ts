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
