import { queryField, list, idArg, nonNull, intArg } from 'nexus';

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

export const NoteQuery = [
  GetSavedNotesQuery,
  GetPublishedNotesQuery,
  GetAllPublishedNotes,
  GetNoteById,
];
