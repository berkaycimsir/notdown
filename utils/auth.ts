import { AuthErrors } from '../generated/graphql';

export const getAuthErrorMessage = (
  type: AuthErrors | null | undefined,
  formType: 'sign-in' | 'sign-up'
): string => {
  switch (type) {
    case AuthErrors.IncorrectPassword:
      return 'Your password is not correct, please try again.';
    case AuthErrors.IncorrectUsernameOrEmail:
      return 'Oops! Wrong email or username.';
    case AuthErrors.UsernameOrEmailAlreadyExists:
      return 'Oops! This user already exists.';
    case null:
      return `You have successfully signed ${
        formType === 'sign-in' ? 'in' : 'up'
      }!`;
    default:
      return '';
  }
};
