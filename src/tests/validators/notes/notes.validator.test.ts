import { describe, expect, test } from '@jest/globals';
import { createNoteValidation } from '../../../validators/notes/createNote.validator';
import { updateNoteValidation } from '../../../validators/notes/updateNote.validator';

describe('Notes Validator', () => {
  describe('Create Note', () => {
    test('Data with title and description: ', async () => {
      expect(async () => {
        await createNoteValidation.validateAsync({
          title: 'title',
          description: 'description',
        });
      }).resolves;
    });

    test('Data with title: ', async () => {
      expect(async () => {
        await createNoteValidation.validateAsync({
          title: 'title',
        });
      }).resolves;
    });

    test('Data with only description', async () => {
      expect(async () => {
        await createNoteValidation.validateAsync({
          description: 'description',
        });
      }).rejects.toThrow();
    });

    test('Data with wrong type', async () => {
      expect(async () => {
        await createNoteValidation.validateAsync({
          title: 10,
        });
      }).rejects.toThrow();
    });

    test('Empty data', async () => {
      expect(async () => {
        await createNoteValidation.validateAsync({});
      }).rejects.toThrow();
    });

    test('Extra fields', async () => {
      expect(async () => {
        await createNoteValidation.validateAsync({
          title: 'title',
          description: 'description',
          extra: 'extra',
        });
      }).rejects.toThrow();
    });
  });

  describe('Update Note', () => {
    test('Data with title and description: ', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          title: 'title',
          description: 'description',
        });
      }).resolves;
    });

    test('Data with title: ', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          title: 'title',
        });
      }).resolves;
    });

    test('Data with only description', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          description: 'description',
        });
      }).resolves;
    });

    test('Data with wrong type', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          title: 10,
        });
      }).rejects.toThrow();
    });

    test('Empty data', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({});
      }).rejects.toThrow();
    });

    test('Extra fields', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          title: 'title',
          description: 'description',
          extra: 'extra',
        });
      }).rejects.toThrow();
    });
  });

  describe('Share Note', () => {
    test('Correct Email: ', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          shareEmail: 'test@gmail.com',
        });
      }).resolves;
    });

    test('Incorrect Email', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          shareEmail: 'test@gmail',
        });
      }).rejects.toThrow();
    });

    test('Empty data', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({});
      }).rejects.toThrow();
    });

    test('Extra fields', async () => {
      expect(async () => {
        await updateNoteValidation.validateAsync({
          shareEmail: 'test@gmail.com',
          extra: 'extra',
        });
      }).rejects.toThrow();
    });
  });
});
