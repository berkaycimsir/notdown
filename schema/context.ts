import { PrismaInstance, prisma } from '../lib/prisma';

export interface Context {
  prisma: PrismaInstance;
  token: string;
}

export const context = (req: any): Context => ({
  prisma,
  token: req.headers.authorization || '',
});
