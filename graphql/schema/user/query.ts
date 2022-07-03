import { list, nonNull, queryField, stringArg } from 'nexus';
import { verify } from '../../../utils/token';

const MeQuery = queryField('me', {
  type: 'User',
  resolve: async (_, __, { prisma, token }) => {
    if (!token) return null;

    const authorizedUser = verify(token) as { userId: number };

    const userData = await prisma.user.findFirst({
      where: { id: authorizedUser.userId },
    });

    return userData;
  },
});

const GetAuthorsByName = queryField('getAuthorsByName', {
  type: list('User'),
  args: {
    searchString: nonNull(stringArg()),
  },
  resolve: async (_, { searchString }, { prisma }) => {
    const authors = await prisma.user.findMany({
      where: {
        fullName: { contains: searchString, mode: 'insensitive' },
        username: { contains: searchString, mode: 'insensitive' },
        email: { contains: searchString, mode: 'insensitive' },
      },
      orderBy: {
        notes: { _count: 'desc' },
      },
    });

    return authors;
  },
});

const GetAuthorByUsername = queryField('getAuthorByUsername', {
  type: 'User',
  args: {
    username: nonNull(stringArg()),
  },
  resolve: async (_, { username }, { prisma }) => {
    const author = await prisma.user.findFirst({
      where: {
        username: { equals: username },
      },
    });

    return author;
  },
});

export const UserQuery = [MeQuery, GetAuthorsByName, GetAuthorByUsername];
