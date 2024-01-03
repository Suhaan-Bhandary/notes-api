import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// Note Table
export interface NoteTable {
  id: Generated<number>;
  title: string;
  description?: string;
}

export type Note = Selectable<NoteTable>;
export type NewNote = Insertable<NoteTable>;
export type NoteUpdate = Updateable<NoteTable>;
