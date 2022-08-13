import { merge } from 'lodash';
import {
  booleanArg,
  idArg,
  mutationField,
  nonNull,
  stringArg,
  list,
  intArg,
  nullable,
} from 'nexus';
import { NoteErrors } from './enum';

const CreateNoteMutation = mutationField('createNote', {
  type: nonNull('CreateNoteMutationReturnType'),
  args: {
    title: nonNull(stringArg()),
    markdown: nonNull(stringArg()),
    summary: nonNull(stringArg()),
    tags: nonNull(list(nonNull(stringArg()))),
    userId: nonNull(idArg()),
    isPublished: nonNull(booleanArg()),
  },
  resolve: async (
    _,
    { title, markdown, summary, tags, userId, isPublished },
    { prisma }
  ) => {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return {
        note: null,
        error: NoteErrors.USER_DOES_NOT_EXISTS,
      };
    }

    const createdNote = await prisma.note.create({
      data: {
        title,
        markdown,
        summary,
        tags,
        authorId: parseInt(userId),
        isPublished,
      },
    });

    return {
      note: createdNote,
      error: null,
    };
  },
});

const UpdateNoteMutation = mutationField('updateNote', {
  type: nullable('Note'),
  args: {
    noteId: nonNull(intArg()),
    newNote: nonNull('UpdateNoteNewNoteInput'),
  },
  resolve: async (_, { noteId, newNote }, { prisma }) => {
    const note = await prisma.note.findFirst({ where: { id: noteId } });

    if (!note) return null;

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: merge(note, newNote),
    });

    if (!updatedNote) {
      return null;
    }

    return updatedNote;
  },
});

const RemoveNoteMutation = mutationField('removeNote', {
  type: nonNull('Note'),
  args: {
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { noteId }, { prisma }) => {
    return await prisma.note.delete({ where: { id: noteId } });
  },
});

const PublishNoteMutation = mutationField('publishNote', {
  type: nonNull('Note'),
  args: {
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { noteId }, { prisma }) => {
    return await prisma.note.update({
      where: { id: noteId },
      data: { isPublished: true },
    });
  },
});

export const NoteMutation = [
  CreateNoteMutation,
  RemoveNoteMutation,
  PublishNoteMutation,
  UpdateNoteMutation,
];
