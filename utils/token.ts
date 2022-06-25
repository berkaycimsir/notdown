import { isBrowser } from '@emotion/utils';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const NOTDOWN_TOKEN_KEY = 'token';

type GenerateArgs = {
  payload: { userId: number };
  options: jwt.SignOptions;
};

export const generate = ({ payload, options }: GenerateArgs): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
};

export const verify = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const getToken = (): string => {
  return localStorage.getItem(NOTDOWN_TOKEN_KEY) || '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(NOTDOWN_TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(NOTDOWN_TOKEN_KEY);
};
