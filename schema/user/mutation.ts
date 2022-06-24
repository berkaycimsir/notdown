import {
  booleanArg,
  intArg,
  mutationField,
  nonNull,
  nullable,
  stringArg,
} from 'nexus';
import { compare, hash } from '../../utils/password';
import { generate } from '../../utils/token';
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
      token: generate({ payload: createdUser, options: { expiresIn: '12h' } }),
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
      token: generate({ payload: user, options: { expiresIn: '12h' } }),
      error: null,
    };
  },
});

const UpdateUserProfileImageMutation = mutationField('updateUserProfileImage', {
  type: nullable('User'),
  args: {
    userId: nonNull(intArg()),
    imageId: nonNull(stringArg()),
  },
  resolve: async (_, { userId, imageId }, { prisma }) => {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageId },
    });

    if (!updatedUser) {
      return null;
    }

    return updatedUser;
  },
});

export const UserMutation = [
  CreateUserMutation,
  SignInMutation,
  UpdateUserProfileImageMutation,
];
