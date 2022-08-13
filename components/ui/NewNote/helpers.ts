import { NoteErrors } from '../../../generated/graphql';

const getErrorMessage = (
  error: NoteErrors | null | undefined,
  isPublished: boolean,
  editMode: boolean
): string => {
  if (editMode) return 'Your note was updated successfully.';

  switch (error) {
    case NoteErrors.UserDoesNotExists:
      return "Couldn't find the author. Please try again!";
    case null:
      return `Your note is successfully ${
        isPublished ? 'published' : 'saved'
      }.`;
    default:
      return '';
  }
};

export { getErrorMessage };
