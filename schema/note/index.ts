import { Note } from 'nexus-prisma';
import { objectType } from 'nexus';
import { NoteMutation } from './mutation';
import { NoteEnums } from './enum';
import { NoteQuery } from './query';

const NoteType = objectType({
  name: Note.$name,
  description: Note.$description,
  definition(t) {
    t.field(Note.id);
    t.field(Note.markdown);
    t.field(Note.title);
    t.field(Note.isPublished);
    t.field(Note.author);
    t.field(Note.authorId);
  },
});

const CreateNoteMutationReturnType = objectType({
  name: 'CreateNoteMutationReturnType',
  definition(t) {
    t.field('note', {
      type: 'Note',
    });
    t.field('error', {
      type: 'NoteErrors',
    });
  },
});

export const NoteTypes = [
  NoteType,
  CreateNoteMutationReturnType,
  ...NoteMutation,
  ...NoteQuery,
  ...NoteEnums,
];
