import { NoteTable } from './note';
import { NoteSharedTable } from './note_shared';
import { UserTable } from './user';

// Define Database
export interface Database {
  user: UserTable;
  note: NoteTable;
  note_shared: NoteSharedTable;
}
