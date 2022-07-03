import { User } from 'nexus-prisma';
import { inputObjectType, list, objectType } from 'nexus';
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
    t.field(User.followers);
    t.field(User.following);

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

    t.field('publishedNotes', {
      type: list('Note'),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.note.findMany({
          where: { authorId: parent.id, isPublished: true },
          orderBy: { createdAt: 'desc' },
        });
      },
    });

    t.field('userFollowers', {
      type: list('User'),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findMany({
          where: { id: { in: parent.followers } },
        });
      },
    });

    t.field('userFollowing', {
      type: list('User'),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findMany({
          where: { id: { in: parent.following } },
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
