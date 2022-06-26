import { queryField, list, idArg, nonNull, intArg, stringArg } from 'nexus';

const GetSavedNotesQuery = queryField('getSavedNotes', {
  type: list('Note'),
  args: {
    authorId: nonNull(idArg()),
  },
  resolve: async (_, { authorId }, { prisma }) => {
    return await prisma.note.findMany({
      where: {
        authorId: parseInt(authorId),
        isPublished: { equals: false },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
});

const GetPublishedNotesQuery = queryField('getPublishedNotes', {
  type: list('Note'),
  args: {
    authorId: nonNull(idArg()),
  },
  resolve: async (_, { authorId }, { prisma }) => {
    return await prisma.note.findMany({
      where: {
        authorId: parseInt(authorId),
        isPublished: { equals: true },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
});

const GetAllPublishedNotes = queryField('getAllPublishedNotes', {
  type: list('Note'),
  resolve: async (_, __, { prisma }) => {
    return await prisma.note.findMany({
      where: {
        isPublished: { equals: true },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
});

const GetNoteById = queryField('getNoteById', {
  type: 'Note',
  args: {
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { noteId }, { prisma }) => {
    const note = await prisma.note.findFirst({ where: { id: noteId } });

    if (!note) return null;

    return note;
  },
});

const GetNotesByTitle = queryField('getNotesByTitle', {
  type: list('Note'),
  args: {
    title: nonNull(stringArg()),
  },
  resolve: async (_, { title }, { prisma }) => {
    const notes = await prisma.note.findMany({
      where: {
        title: { contains: title, mode: 'insensitive' },
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notes;
  },
});

export const NoteQuery = [
  GetSavedNotesQuery,
  GetPublishedNotesQuery,
  GetAllPublishedNotes,
  GetNotesByTitle,
  GetNoteById,
];
