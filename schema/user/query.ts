import { User } from '@prisma/client';
import { queryField } from 'nexus';
import { verify } from '../../utils/token';

const MeQuery = queryField('me', {
  type: 'User',
  resolve: (_, __, { token }) => {
    return token ? (verify(token) as User) : null;
  },
});

export const UserQuery = [MeQuery];
