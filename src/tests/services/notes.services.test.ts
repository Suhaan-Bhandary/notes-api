import bcrypt from 'bcryptjs';
import { db } from '../../db/db';
import { authService, notesService } from '../../services';

describe('Notes Service', () => {
  const user = {
    email: 'test@gmail.com',
    name: 'test',
    password: 'test',
  };

  const otherUser = {
    email: 'abc@gmail.com',
    name: 'abc',
    password: 'abc',
  };

  beforeAll(async () => {
    const hashPassword = await bcrypt.hash(user.password, 12);
    await authService.createUser({
      ...user,
      password: hashPassword,
    });

    const otherHashPassword = await bcrypt.hash(otherUser.password, 12);
    await authService.createUser({
      ...otherUser,
      password: otherHashPassword,
    });
  });

  afterAll(async () => {
    await db.deleteFrom('user').execute();
    await db.deleteFrom('note').execute();
    await db.deleteFrom('note_shared').execute();
  });

  afterEach(async () => {
    await db.deleteFrom('note').execute();
    await db.deleteFrom('note_shared').execute();
  });

  describe('createNote', () => {
    test('Create valid Note', async () => {
      const note = { title: 'trial' };
      await notesService.createNote(note, user.email);

      // Check if note is inserted in the db
      expect(async () => {
        await db.selectFrom('note').executeTakeFirstOrThrow();
      }).resolves;

      // Check if note is shared with the creator
      expect(async () => {
        await db.selectFrom('note_shared').executeTakeFirstOrThrow();
      }).resolves;
    });
  });

  describe('getNotes', () => {
    test('note inserted in table', async () => {
      const note = { title: 'trial' };

      // Creating 2 notes
      await notesService.createNote(note, user.email);
      await notesService.createNote(note, user.email);

      // Check if we get 2 notes back or not
      const notes = await notesService.getNotes(user.email);
      expect(notes.length).toBe(2);
    });

    test('empty notes', async () => {
      const notes = await notesService.getNotes(user.email);
      expect(notes.length).toBe(0);
    });

    test('other email', async () => {
      const notes = await notesService.getNotes(otherUser.email);
      expect(notes.length).toBe(0);
    });
  });

  describe('getNote', () => {
    test('Get valid Note by Id', async () => {
      const note = { title: 'trial' };
      await notesService.createNote(note, user.email);

      const noteId = await db
        .selectFrom('note')
        .select('id')
        .executeTakeFirst()
        .then((note) => note?.id);

      if (!noteId) {
        expect(noteId).toBeTruthy();
        return;
      }

      const noteReceived = await notesService.getNote(noteId, user.email);
      expect(noteReceived).toBeTruthy();
    });

    test('Invalid Id', async () => {
      const noteReceived = await notesService.getNote(100, user.email);
      expect(noteReceived).toBeFalsy();
    });
  });

  describe('isCreator', () => {
    test('Is Creator', async () => {
      const note = { title: 'trial' };
      await notesService.createNote(note, user.email);

      const noteId = await db
        .selectFrom('note')
        .select('id')
        .executeTakeFirst()
        .then((note) => note?.id);

      if (!noteId) {
        expect(noteId).toBeTruthy();
        return;
      }

      const isCreator = await notesService.isCreator(noteId, user.email);
      expect(isCreator).toBeTruthy();
    });

    test('Is Not Creator', async () => {
      const note = { title: 'trial' };
      await notesService.createNote(note, user.email);

      const noteId = await db
        .selectFrom('note')
        .select('id')
        .executeTakeFirst()
        .then((note) => note?.id);

      if (!noteId) {
        expect(noteId).toBeTruthy();
        return;
      }

      const isCreator = await notesService.isCreator(noteId, otherUser.email);
      expect(isCreator).toBeFalsy();
    });
  });

  test('Delete Note', async () => {
    const note = { title: 'trial' };
    await notesService.createNote(note, user.email);

    const noteId = await db
      .selectFrom('note')
      .select('id')
      .executeTakeFirst()
      .then((note) => note?.id);

    if (!noteId) {
      expect(noteId).toBeTruthy();
      return;
    }

    expect(async () => {
      await notesService.deleteNote(noteId);
    }).resolves;
  });

  test('Update Note', async () => {
    const note = { title: 'trial' };
    await notesService.createNote(note, user.email);

    const noteId = await db
      .selectFrom('note')
      .select('id')
      .executeTakeFirst()
      .then((note) => note?.id);

    if (!noteId) {
      expect(noteId).toBeTruthy();
      return;
    }

    expect(async () => {
      await notesService.updateNote(noteId, { title: 'updated' });
      // Check if the title is updated
      const updatedNote = await db
        .selectFrom('note')
        .selectAll()
        .where('id', '=', noteId)
        .executeTakeFirst();

      expect(updatedNote?.title).toBe('updated');
    }).resolves;
  });

  test('shareNote', async () => {
    const note = { title: 'trial' };
    await notesService.createNote(note, user.email);

    const noteId = await db
      .selectFrom('note')
      .select('id')
      .executeTakeFirst()
      .then((note) => note?.id);

    if (!noteId) {
      expect(noteId).toBeTruthy();
      return;
    }

    // Sharing the note to the other user
    await notesService.shareNote(noteId, otherUser.email);

    // Check if the note_shared has 2 entries in it or not
    const notes_shared = await db
      .selectFrom('note_shared')
      .selectAll()
      .execute();

    expect(notes_shared.length).toBe(2);
  });

  describe('getNotesByQuery', () => {
    beforeEach(async () => {
      // Other user notes
      await notesService.createNote(
        { title: 'apple is a fruit' },
        otherUser.email,
      );

      // user notes
      await notesService.createNote({ title: 'apple is a fruit' }, user.email);
      await notesService.createNote({ title: 'banana is a fruit' }, user.email);
      await notesService.createNote({ title: 'mars is a planet' }, user.email);
      await notesService.createNote(
        { title: 'we live on planet earth' },
        user.email,
      );
    });

    test('find user notes with keyword in it', async () => {
      const notes = await notesService.getNotesByQuery('fruit', user.email);
      expect(notes.length).toBe(2);
    });

    test('find keyword not in any notes absent', async () => {
      const notes = await notesService.getNotesByQuery('ocean', user.email);
      expect(notes.length).toBe(0);
    });
  });
});
