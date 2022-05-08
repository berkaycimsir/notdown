import { queryField, list, idArg, nonNull } from 'nexus';

const GetNotesQuery = queryField('getNotes', {
  type: list('Note'),
  args: {
    authorId: nonNull(idArg()),
  },
  resolve: async (_, { authorId }, { prisma }) => {
    return await prisma.note.findMany({
      where: {
        authorId: parseInt(authorId),
      },
    });
  },
});

export const NoteQuery = [GetNotesQuery];
