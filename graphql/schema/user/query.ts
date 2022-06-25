import { queryField } from 'nexus';
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

export const UserQuery = [MeQuery];
