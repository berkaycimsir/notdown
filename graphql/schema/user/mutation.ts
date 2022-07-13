import { merge, unionBy } from 'lodash';
import {
  booleanArg,
  inputObjectType,
  intArg,
  mutationField,
  nonNull,
  nullable,
  stringArg,
} from 'nexus';
import { compare, hash } from '../../../utils/password';
import { generate } from '../../../utils/token';
import { AuthErrors } from './enum';

const CreateUserMutation = mutationField('createUser', {
  type: nonNull('AuthMutationReturnType'),
  args: {
    fullName: nonNull(stringArg()),
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, { fullName, email, username, password }, { prisma }) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (user) {
      return {
        token: null,
        error: AuthErrors.USERNAME_OR_EMAIL_ALREADY_EXISTS,
      };
    }

    const hashedPassword = hash(password);

    const createdUser = await prisma.user.create({
      data: {
        fullName,
        email,
        username,
        password: hashedPassword,
      },
    });

    return {
      token: generate({
        payload: { userId: createdUser.id },
        options: { expiresIn: '12h' },
      }),
      error: null,
    };
  },
});

const SignInMutation = mutationField('signIn', {
  type: nonNull('AuthMutationReturnType'),
  args: {
    email: stringArg(),
    username: stringArg(),
    password: nonNull(stringArg()),
  },
  resolve: async (_, { email, username, password }, { prisma }) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username as string }, { email: email as string }],
      },
    });

    if (!user) {
      return {
        token: null,
        error: AuthErrors.INCORRECT_USERNAME_OR_EMAIL,
      };
    }

    const comparedPassword = compare(password, user.password);

    if (!comparedPassword) {
      return {
        token: null,
        error: AuthErrors.INCORRECT_PASSWORD,
      };
    }

    return {
      token: generate({
        payload: { userId: user.id },
        options: { expiresIn: '12h' },
      }),
      error: null,
    };
  },
});

const UpdateUserProfile = mutationField('updateUserProfile', {
  type: nullable('User'),
  args: {
    userId: nonNull('Int'),
    newUser: nonNull('UpdateUserNewUserInput'),
  },
  resolve: async (_, { userId, newUser }, { prisma }) => {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) return null;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: merge(user, newUser),
    });

    if (!updatedUser) {
      return null;
    }

    return updatedUser;
  },
});

const FollowAuthor = mutationField('followAuthor', {
  type: 'User',
  args: {
    userId: nonNull(intArg()),
    authorId: nonNull(intArg()),
  },
  resolve: async (_, { userId, authorId }, { prisma }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const author = await prisma.user.findUnique({ where: { id: authorId } });

    if (!user || !author) return null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        following: [authorId, ...user.following],
      },
    });

    await prisma.user.update({
      where: { id: authorId },
      data: {
        followers: [userId, ...author.followers],
      },
    });

    return author;
  },
});

const UnfollowAuthor = mutationField('unfollowAuthor', {
  type: 'User',
  args: {
    userId: nonNull(intArg()),
    authorId: nonNull(intArg()),
  },
  resolve: async (_, { userId, authorId }, { prisma }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const author = await prisma.user.findUnique({ where: { id: authorId } });

    if (!user || !author) return null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        following: user.following.filter((id) => id !== authorId),
      },
    });

    await prisma.user.update({
      where: { id: authorId },
      data: {
        followers: author.followers.filter((id) => id !== userId),
      },
    });

    return author;
  },
});

const FavoriteNote = mutationField('favoriteNote', {
  type: 'User',
  args: {
    userId: nonNull(intArg()),
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { userId, noteId }, { prisma }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: unionBy([noteId], user.favorites),
      },
    });

    return user;
  },
});

const UnfavoriteNote = mutationField('unfavoriteNote', {
  type: 'User',
  args: {
    userId: nonNull(intArg()),
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { userId, noteId }, { prisma }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: unionBy(user.favorites.filter((id) => id !== noteId)),
      },
    });

    return user;
  },
});

const BookmarkNote = mutationField('bookmarkNote', {
  type: 'User',
  args: {
    userId: nonNull(intArg()),
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { userId, noteId }, { prisma }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: unionBy([noteId], user.bookmarks),
      },
    });

    return user;
  },
});

const UnbookmarkNote = mutationField('unbookmarkNote', {
  type: 'User',
  args: {
    userId: nonNull(intArg()),
    noteId: nonNull(intArg()),
  },
  resolve: async (_, { userId, noteId }, { prisma }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: unionBy(user.bookmarks.filter((id) => id !== noteId)),
      },
    });

    return user;
  },
});

export const UserMutation = [
  CreateUserMutation,
  SignInMutation,
  UpdateUserProfile,
  FollowAuthor,
  UnfollowAuthor,
  FavoriteNote,
  UnfavoriteNote,
  BookmarkNote,
  UnbookmarkNote,
];
