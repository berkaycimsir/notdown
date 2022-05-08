import { enumType } from 'nexus';

export enum NoteErrors {
  USER_DOES_NOT_EXISTS = 'user-does-not-exists',
}

const NoteErrorsEnum = enumType({
  name: 'NoteErrors',
  members: {
    USER_DOES_NOT_EXISTS: 'user-does-not-exists',
  },
});

export const NoteEnums = [NoteErrorsEnum];
