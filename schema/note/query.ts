import { queryField, list, idArg, nonNull } from 'nexus';

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

export const NoteQuery = [GetSavedNotesQuery, GetPublishedNotesQuery];
