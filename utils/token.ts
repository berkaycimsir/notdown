import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

type GenerateArgs = {
  payload: User;
  options: jwt.SignOptions;
};

export const generate = ({ payload, options }: GenerateArgs): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
};

export const verify = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
