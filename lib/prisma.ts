import { PrismaClient, Prisma } from '@prisma/client';
import { prod } from './isProd';

export type PrismaInstance = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

let prisma: PrismaInstance;

if (prod) {
  prisma = new PrismaClient();
} else {
  const g = global as any;
  if (!g.prisma) g.prisma = new PrismaClient();
  prisma = g.prisma;
}

export { prisma };
