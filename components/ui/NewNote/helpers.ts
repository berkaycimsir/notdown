import { unionBy } from 'lodash';
import {
  CreateNoteMutationNoteFragment,
  GetPublishedNotesDocument,
  GetPublishedNotesQuery,
  GetPublishedNotesQueryVariables,
  GetSavedNotesDocument,
  GetSavedNotesQuery,
  GetSavedNotesQueryVariables,
  NoteErrors,
} from '../../../generated/graphql';
import { cache } from '../../../graphql/client';

const updatePublishedNotes = (
  authorId: string,
  createdNote: CreateNoteMutationNoteFragment
): void => {
  cache.updateQuery<GetPublishedNotesQuery, GetPublishedNotesQueryVariables>(
    {
      query: GetPublishedNotesDocument,
      variables: { authorId },
    },
    (prev) => ({
      ...prev,
      getPublishedNotes: unionBy([createdNote], prev?.getPublishedNotes, 'id'),
    })
  );
};

const updateSavedNotes = (
  authorId: string,
  createdNote: CreateNoteMutationNoteFragment
): void => {
  cache.updateQuery<GetSavedNotesQuery, GetSavedNotesQueryVariables>(
    {
      query: GetSavedNotesDocument,
      variables: { authorId },
    },
    (prev) => ({
      ...prev,
      getSavedNotes: unionBy([createdNote], prev?.getSavedNotes, 'id'),
    })
  );
};

const getErrorMessage = (
  error: NoteErrors | null | undefined,
  isPublished: boolean
): string => {
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

export { updatePublishedNotes, updateSavedNotes, getErrorMessage };
