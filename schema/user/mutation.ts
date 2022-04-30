import { mutationField, nonNull, stringArg } from 'nexus';
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
      select: {
        email: true,
        username: true,
      },
    });

    if (user) {
      return {
        token: null,
        error: AuthErrors.USERNAME_OR_EMAIL_ALREADY_EXISTS,
      };
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName,
        email,
        username,
        password,
      },
    });

    return {
      token: generate({ payload: createdUser, options: { expiresIn: '12h' } }),
      error: null,
    };
  },
});

export const UserMutation = [CreateUserMutation];
