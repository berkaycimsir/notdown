import { idArg, mutationField, nonNull, stringArg } from 'nexus';
import { NoteErrors } from './enum';

const CreateNoteMutation = mutationField('createNote', {
  type: nonNull('CreateNoteMutationReturnType'),
  args: {
    title: nonNull(stringArg()),
    markdown: nonNull(stringArg()),
    userId: nonNull(idArg()),
  },
  resolve: async (_, { title, markdown, userId }, { prisma }) => {
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
        authorId: parseInt(userId),
      },
    });

    return {
      note: createdNote,
      error: null,
    };
  },
});

export const NoteMutation = [CreateNoteMutation];
