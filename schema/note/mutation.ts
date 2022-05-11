import {
  booleanArg,
  idArg,
  mutationField,
  nonNull,
  stringArg,
  list,
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

export const NoteMutation = [CreateNoteMutation];
