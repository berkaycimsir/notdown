import { User } from 'nexus-prisma';
import { inputObjectType, objectType } from 'nexus';
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
    t.field(User.profileImage);
    t.field(User.createdAt);
    t.field(User.notes);
    t.int('notesCount', {
      resolve: async (parent, _, { prisma }) => {
        return await prisma.note.count({
          where: { authorId: parent.id, isPublished: true },
        });
      },
    });
    t.field('latestNote', {
      type: 'Note',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.note.findFirst({
          where: { authorId: parent.id, isPublished: true },
          take: 1,
          orderBy: { createdAt: 'desc' },
        });
      },
    });
  },
});

const UpdateUserNewUserInput = inputObjectType({
  name: 'UpdateUserNewUserInput',
  definition(t) {
    t.nullable.string('fullName');
    t.nullable.string('username');
    t.nullable.string('email');
    t.nullable.string('profileImage');
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
  UpdateUserNewUserInput,
  ...UserMutation,
  ...UserEnums,
];
