import { mutationField, nonNull, stringArg } from 'nexus';

const CreateUserMutation = mutationField('createUser', {
  type: 'User',
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
      return null;
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName,
        email,
        username,
        password,
      },
    });

    return createdUser;
  },
});

export const UserMutation = [CreateUserMutation];
