import { Insertable, Selectable, Updateable } from 'kysely';

// NoteShared Table
export interface NoteSharedTable {
  is_creator: boolean;
  user_email: string;
  note_id: number;
}

export type NoteShared = Selectable<NoteSharedTable>;
export type NewNoteShared = Insertable<NoteSharedTable>;
export type NoteSharedUpdate = Updateable<NoteSharedTable>;
