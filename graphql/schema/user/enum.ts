import { enumType } from 'nexus';

export enum AuthErrors {
  INCORRECT_PASSWORD = 'incorrect-password',
  USERNAME_OR_EMAIL_ALREADY_EXISTS = 'username-or-email-already-exists',
  INCORRECT_USERNAME_OR_EMAIL = 'incorrect-username-or-email',
}

const AuthErrorsEnum = enumType({
  name: 'AuthErrors',
  members: {
    INCORRECT_PASSWORD: 'incorrect-password',
    USERNAME_OR_EMAIL_ALREADY_EXISTS: 'username-or-email-already-exists',
    INCORRECT_USERNAME_OR_EMAIL: 'incorrect-username-or-email',
  },
});

export const UserEnums = [AuthErrorsEnum];
