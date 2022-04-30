import { User } from 'nexus-prisma';
import { objectType } from 'nexus';
import { UserMutation } from './mutation';
import { UserEnums } from './enum';
import { UserQuery } from './query';

const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.fullName);
    t.field(User.email);
    t.field(User.username);
  },
});

const AuthMutationReturnType = objectType({
  name: 'AuthMutationReturnType',
  definition(t) {
    t.string('token');
    t.field('error', {
      type: 'AuthErrors',
    });
  },
});

export const UserTypes = [
  UserType,
  UserQuery,
  AuthMutationReturnType,
  ...UserMutation,
  ...UserEnums,
];
