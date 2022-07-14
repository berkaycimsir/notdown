import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export enum AuthErrors {
  IncorrectPassword = 'INCORRECT_PASSWORD',
  IncorrectUsernameOrEmail = 'INCORRECT_USERNAME_OR_EMAIL',
  UsernameOrEmailAlreadyExists = 'USERNAME_OR_EMAIL_ALREADY_EXISTS'
}

export type AuthMutationReturnType = {
  __typename?: 'AuthMutationReturnType';
  error?: Maybe<AuthErrors>;
  token?: Maybe<Scalars['String']>;
};

export type CreateNoteMutationReturnType = {
  __typename?: 'CreateNoteMutationReturnType';
  error?: Maybe<NoteErrors>;
  note?: Maybe<Note>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkNote?: Maybe<User>;
  createNote: CreateNoteMutationReturnType;
  createUser: AuthMutationReturnType;
  favoriteNote?: Maybe<User>;
  followAuthor?: Maybe<User>;
  signIn: AuthMutationReturnType;
  unbookmarkNote?: Maybe<User>;
  unfavoriteNote?: Maybe<User>;
  unfollowAuthor?: Maybe<User>;
  updateUserProfile?: Maybe<User>;
};


export type MutationBookmarkNoteArgs = {
  noteId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationCreateNoteArgs = {
  isPublished: Scalars['Boolean'];
  markdown: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationFavoriteNoteArgs = {
  noteId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationFollowAuthorArgs = {
  authorId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationSignInArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUnbookmarkNoteArgs = {
  noteId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUnfavoriteNoteArgs = {
  noteId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUnfollowAuthorArgs = {
  authorId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUpdateUserProfileArgs = {
  newUser: UpdateUserNewUserInput;
  userId: Scalars['Int'];
};

export type Note = {
  __typename?: 'Note';
  author: User;
  authorId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  favorites?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  markdown: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum NoteErrors {
  UserDoesNotExists = 'USER_DOES_NOT_EXISTS'
}

export type Query = {
  __typename?: 'Query';
  getAllPublishedNotes?: Maybe<Array<Maybe<Note>>>;
  getAuthorByUsername?: Maybe<User>;
  getAuthorsByName?: Maybe<Array<Maybe<User>>>;
  getNoteById?: Maybe<Note>;
  getNotesByFollowing?: Maybe<Array<Maybe<Note>>>;
  getNotesByTitle?: Maybe<Array<Maybe<Note>>>;
  getPublishedNotes?: Maybe<Array<Maybe<Note>>>;
  getSavedNotes?: Maybe<Array<Maybe<Note>>>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetAuthorByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetAuthorsByNameArgs = {
  searchString: Scalars['String'];
};


export type QueryGetNoteByIdArgs = {
  noteId: Scalars['Int'];
};


export type QueryGetNotesByFollowingArgs = {
  userFollowing: Array<Scalars['Int']>;
};


export type QueryGetNotesByTitleArgs = {
  title: Scalars['String'];
};


export type QueryGetPublishedNotesArgs = {
  authorId: Scalars['ID'];
};


export type QueryGetSavedNotesArgs = {
  authorId: Scalars['ID'];
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type UpdateUserNewUserInput = {
  about?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  bookmarks: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favorites: Array<Scalars['Int']>;
  followers: Array<Scalars['Int']>;
  following: Array<Scalars['Int']>;
  fullName: Scalars['String'];
  id: Scalars['Int'];
  latestNote?: Maybe<Note>;
  notes: Array<Note>;
  notesCount?: Maybe<Scalars['Int']>;
  profileImage?: Maybe<Scalars['String']>;
  publishedNotes?: Maybe<Array<Maybe<Note>>>;
  userBookmarks?: Maybe<Array<Maybe<Note>>>;
  userFavorites?: Maybe<Array<Maybe<Note>>>;
  userFollowers?: Maybe<Array<Maybe<User>>>;
  userFollowing?: Maybe<Array<Maybe<User>>>;
  username: Scalars['String'];
};

export type CreateNoteMutationNoteFragment = { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null };

export type CreateNoteMutationVariables = Exact<{
  title: Scalars['String'];
  markdown: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  userId: Scalars['ID'];
  isPublished: Scalars['Boolean'];
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'CreateNoteMutationReturnType', error?: NoteErrors | null, note?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null } };

export type NotesQueryNoteFragment = { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null };

export type GetSavedNotesQueryVariables = Exact<{
  authorId: Scalars['ID'];
}>;


export type GetSavedNotesQuery = { __typename?: 'Query', getSavedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null };

export type GetPublishedNotesQueryVariables = Exact<{
  authorId: Scalars['ID'];
}>;


export type GetPublishedNotesQuery = { __typename?: 'Query', getPublishedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null };

export type GetAllPublishedNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPublishedNotesQuery = { __typename?: 'Query', getAllPublishedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null };

export type GetNoteByIdQueryVariables = Exact<{
  noteId: Scalars['Int'];
}>;


export type GetNoteByIdQuery = { __typename?: 'Query', getNoteById?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null };

export type GetNotesByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetNotesByTitleQuery = { __typename?: 'Query', getNotesByTitle?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null };

export type GetNotesByFollowingQueryVariables = Exact<{
  userFollowing: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetNotesByFollowingQuery = { __typename?: 'Query', getNotesByFollowing?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null };

export type SignInMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthMutationReturnType', token?: string | null, error?: AuthErrors | null } };

export type SignUpMutationVariables = Exact<{
  fullName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthMutationReturnType', token?: string | null, error?: AuthErrors | null } };

export type UpdateUserProfileMutationVariables = Exact<{
  newUser: UpdateUserNewUserInput;
  userId: Scalars['Int'];
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type FollowAuthorMutationVariables = Exact<{
  userId: Scalars['Int'];
  authorId: Scalars['Int'];
}>;


export type FollowAuthorMutation = { __typename?: 'Mutation', followAuthor?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type UnfollowAuthorMutationVariables = Exact<{
  userId: Scalars['Int'];
  authorId: Scalars['Int'];
}>;


export type UnfollowAuthorMutation = { __typename?: 'Mutation', unfollowAuthor?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type FavoriteNoteMutationVariables = Exact<{
  userId: Scalars['Int'];
  noteId: Scalars['Int'];
}>;


export type FavoriteNoteMutation = { __typename?: 'Mutation', favoriteNote?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type UnfavoriteNoteMutationVariables = Exact<{
  userId: Scalars['Int'];
  noteId: Scalars['Int'];
}>;


export type UnfavoriteNoteMutation = { __typename?: 'Mutation', unfavoriteNote?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type BookmarkNoteMutationVariables = Exact<{
  userId: Scalars['Int'];
  noteId: Scalars['Int'];
}>;


export type BookmarkNoteMutation = { __typename?: 'Mutation', bookmarkNote?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type UnbookmarkNoteMutationVariables = Exact<{
  userId: Scalars['Int'];
  noteId: Scalars['Int'];
}>;


export type UnbookmarkNoteMutation = { __typename?: 'Mutation', unbookmarkNote?: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null };

export type GetAuthorsByNameUserFragment = { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null, notesCount?: number | null, createdAt: any, latestNote?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null };

export type UserFollowerFragment = { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null };

export type GetAuthorByUsernameUserFragment = { __typename?: 'User', id: number, fullName: string, username: string, about?: string | null, email: string, profileImage?: string | null, notesCount?: number | null, createdAt: any, latestNote?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null, userFollowers?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null } | null> | null, userFollowing?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null } | null> | null, publishedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, fullName: string, username: string, about?: string | null, email: string, profileImage?: string | null, followers: Array<number>, following: Array<number>, createdAt: any, favorites: Array<number>, bookmarks: Array<number>, userFollowers?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null } | null> | null, userFollowing?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null } | null> | null, userBookmarks?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null, userFavorites?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null } | null };

export type GetAuthorsByNameQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type GetAuthorsByNameQuery = { __typename?: 'Query', getAuthorsByName?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null, notesCount?: number | null, createdAt: any, latestNote?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null } | null> | null };

export type GetAuthorByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetAuthorByUsernameQuery = { __typename?: 'Query', getAuthorByUsername?: { __typename?: 'User', id: number, fullName: string, username: string, about?: string | null, email: string, profileImage?: string | null, notesCount?: number | null, createdAt: any, latestNote?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null, userFollowers?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null } | null> | null, userFollowing?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null, about?: string | null } | null> | null, publishedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null }, favorites?: Array<{ __typename?: 'User', id: number, fullName: string, username: string, email: string, profileImage?: string | null } | null> | null } | null> | null } | null };

export const CreateNoteMutationNoteFragmentDoc = gql`
    fragment CreateNoteMutationNote on Note {
  id
  markdown
  title
  summary
  isPublished
  updatedAt
  createdAt
  tags
  author {
    id
    fullName
    username
    email
    profileImage
  }
  favorites {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export const NotesQueryNoteFragmentDoc = gql`
    fragment NotesQueryNote on Note {
  id
  markdown
  title
  summary
  isPublished
  updatedAt
  createdAt
  tags
  author {
    id
    fullName
    username
    email
    profileImage
  }
  favorites {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export const GetAuthorsByNameUserFragmentDoc = gql`
    fragment GetAuthorsByNameUser on User {
  id
  fullName
  username
  email
  profileImage
  about
  notesCount
  createdAt
  latestNote {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;
export const UserFollowerFragmentDoc = gql`
    fragment UserFollower on User {
  id
  fullName
  username
  email
  profileImage
  about
}
    `;
export const GetAuthorByUsernameUserFragmentDoc = gql`
    fragment GetAuthorByUsernameUser on User {
  id
  fullName
  username
  about
  email
  profileImage
  notesCount
  createdAt
  latestNote {
    ...NotesQueryNote
  }
  userFollowers {
    ...UserFollower
  }
  userFollowing {
    ...UserFollower
  }
  publishedNotes {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}
${UserFollowerFragmentDoc}`;
export const CreateNoteDocument = gql`
    mutation CreateNote($title: String!, $markdown: String!, $summary: String!, $tags: [String!]!, $userId: ID!, $isPublished: Boolean!) {
  createNote(
    title: $title
    markdown: $markdown
    summary: $summary
    tags: $tags
    userId: $userId
    isPublished: $isPublished
  ) {
    note {
      ...CreateNoteMutationNote
    }
    error
  }
}
    ${CreateNoteMutationNoteFragmentDoc}`;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      title: // value for 'title'
 *      markdown: // value for 'markdown'
 *      summary: // value for 'summary'
 *      tags: // value for 'tags'
 *      userId: // value for 'userId'
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const GetSavedNotesDocument = gql`
    query GetSavedNotes($authorId: ID!) {
  getSavedNotes(authorId: $authorId) {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;

/**
 * __useGetSavedNotesQuery__
 *
 * To run a query within a React component, call `useGetSavedNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedNotesQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetSavedNotesQuery(baseOptions: Apollo.QueryHookOptions<GetSavedNotesQuery, GetSavedNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedNotesQuery, GetSavedNotesQueryVariables>(GetSavedNotesDocument, options);
      }
export function useGetSavedNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedNotesQuery, GetSavedNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedNotesQuery, GetSavedNotesQueryVariables>(GetSavedNotesDocument, options);
        }
export type GetSavedNotesQueryHookResult = ReturnType<typeof useGetSavedNotesQuery>;
export type GetSavedNotesLazyQueryHookResult = ReturnType<typeof useGetSavedNotesLazyQuery>;
export type GetSavedNotesQueryResult = Apollo.QueryResult<GetSavedNotesQuery, GetSavedNotesQueryVariables>;
export const GetPublishedNotesDocument = gql`
    query GetPublishedNotes($authorId: ID!) {
  getPublishedNotes(authorId: $authorId) {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;

/**
 * __useGetPublishedNotesQuery__
 *
 * To run a query within a React component, call `useGetPublishedNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublishedNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublishedNotesQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetPublishedNotesQuery(baseOptions: Apollo.QueryHookOptions<GetPublishedNotesQuery, GetPublishedNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublishedNotesQuery, GetPublishedNotesQueryVariables>(GetPublishedNotesDocument, options);
      }
export function useGetPublishedNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublishedNotesQuery, GetPublishedNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublishedNotesQuery, GetPublishedNotesQueryVariables>(GetPublishedNotesDocument, options);
        }
export type GetPublishedNotesQueryHookResult = ReturnType<typeof useGetPublishedNotesQuery>;
export type GetPublishedNotesLazyQueryHookResult = ReturnType<typeof useGetPublishedNotesLazyQuery>;
export type GetPublishedNotesQueryResult = Apollo.QueryResult<GetPublishedNotesQuery, GetPublishedNotesQueryVariables>;
export const GetAllPublishedNotesDocument = gql`
    query GetAllPublishedNotes {
  getAllPublishedNotes {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;

/**
 * __useGetAllPublishedNotesQuery__
 *
 * To run a query within a React component, call `useGetAllPublishedNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPublishedNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPublishedNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPublishedNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPublishedNotesQuery, GetAllPublishedNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPublishedNotesQuery, GetAllPublishedNotesQueryVariables>(GetAllPublishedNotesDocument, options);
      }
export function useGetAllPublishedNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPublishedNotesQuery, GetAllPublishedNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPublishedNotesQuery, GetAllPublishedNotesQueryVariables>(GetAllPublishedNotesDocument, options);
        }
export type GetAllPublishedNotesQueryHookResult = ReturnType<typeof useGetAllPublishedNotesQuery>;
export type GetAllPublishedNotesLazyQueryHookResult = ReturnType<typeof useGetAllPublishedNotesLazyQuery>;
export type GetAllPublishedNotesQueryResult = Apollo.QueryResult<GetAllPublishedNotesQuery, GetAllPublishedNotesQueryVariables>;
export const GetNoteByIdDocument = gql`
    query GetNoteById($noteId: Int!) {
  getNoteById(noteId: $noteId) {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;

/**
 * __useGetNoteByIdQuery__
 *
 * To run a query within a React component, call `useGetNoteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteByIdQuery({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useGetNoteByIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
      }
export function useGetNoteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
        }
export type GetNoteByIdQueryHookResult = ReturnType<typeof useGetNoteByIdQuery>;
export type GetNoteByIdLazyQueryHookResult = ReturnType<typeof useGetNoteByIdLazyQuery>;
export type GetNoteByIdQueryResult = Apollo.QueryResult<GetNoteByIdQuery, GetNoteByIdQueryVariables>;
export const GetNotesByTitleDocument = gql`
    query GetNotesByTitle($title: String!) {
  getNotesByTitle(title: $title) {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;

/**
 * __useGetNotesByTitleQuery__
 *
 * To run a query within a React component, call `useGetNotesByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetNotesByTitleQuery(baseOptions: Apollo.QueryHookOptions<GetNotesByTitleQuery, GetNotesByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesByTitleQuery, GetNotesByTitleQueryVariables>(GetNotesByTitleDocument, options);
      }
export function useGetNotesByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesByTitleQuery, GetNotesByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesByTitleQuery, GetNotesByTitleQueryVariables>(GetNotesByTitleDocument, options);
        }
export type GetNotesByTitleQueryHookResult = ReturnType<typeof useGetNotesByTitleQuery>;
export type GetNotesByTitleLazyQueryHookResult = ReturnType<typeof useGetNotesByTitleLazyQuery>;
export type GetNotesByTitleQueryResult = Apollo.QueryResult<GetNotesByTitleQuery, GetNotesByTitleQueryVariables>;
export const GetNotesByFollowingDocument = gql`
    query GetNotesByFollowing($userFollowing: [Int!]!) {
  getNotesByFollowing(userFollowing: $userFollowing) {
    ...NotesQueryNote
  }
}
    ${NotesQueryNoteFragmentDoc}`;

/**
 * __useGetNotesByFollowingQuery__
 *
 * To run a query within a React component, call `useGetNotesByFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesByFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesByFollowingQuery({
 *   variables: {
 *      userFollowing: // value for 'userFollowing'
 *   },
 * });
 */
export function useGetNotesByFollowingQuery(baseOptions: Apollo.QueryHookOptions<GetNotesByFollowingQuery, GetNotesByFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesByFollowingQuery, GetNotesByFollowingQueryVariables>(GetNotesByFollowingDocument, options);
      }
export function useGetNotesByFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesByFollowingQuery, GetNotesByFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesByFollowingQuery, GetNotesByFollowingQueryVariables>(GetNotesByFollowingDocument, options);
        }
export type GetNotesByFollowingQueryHookResult = ReturnType<typeof useGetNotesByFollowingQuery>;
export type GetNotesByFollowingLazyQueryHookResult = ReturnType<typeof useGetNotesByFollowingLazyQuery>;
export type GetNotesByFollowingQueryResult = Apollo.QueryResult<GetNotesByFollowingQuery, GetNotesByFollowingQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String, $email: String, $password: String!) {
  signIn(username: $username, email: $email, password: $password) {
    token
    error
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($fullName: String!, $username: String!, $email: String!, $password: String!) {
  createUser(
    fullName: $fullName
    username: $username
    email: $email
    password: $password
  ) {
    token
    error
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($newUser: UpdateUserNewUserInput!, $userId: Int!) {
  updateUserProfile(newUser: $newUser, userId: $userId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const FollowAuthorDocument = gql`
    mutation followAuthor($userId: Int!, $authorId: Int!) {
  followAuthor(userId: $userId, authorId: $authorId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type FollowAuthorMutationFn = Apollo.MutationFunction<FollowAuthorMutation, FollowAuthorMutationVariables>;

/**
 * __useFollowAuthorMutation__
 *
 * To run a mutation, you first call `useFollowAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followAuthorMutation, { data, loading, error }] = useFollowAuthorMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useFollowAuthorMutation(baseOptions?: Apollo.MutationHookOptions<FollowAuthorMutation, FollowAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowAuthorMutation, FollowAuthorMutationVariables>(FollowAuthorDocument, options);
      }
export type FollowAuthorMutationHookResult = ReturnType<typeof useFollowAuthorMutation>;
export type FollowAuthorMutationResult = Apollo.MutationResult<FollowAuthorMutation>;
export type FollowAuthorMutationOptions = Apollo.BaseMutationOptions<FollowAuthorMutation, FollowAuthorMutationVariables>;
export const UnfollowAuthorDocument = gql`
    mutation unfollowAuthor($userId: Int!, $authorId: Int!) {
  unfollowAuthor(userId: $userId, authorId: $authorId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type UnfollowAuthorMutationFn = Apollo.MutationFunction<UnfollowAuthorMutation, UnfollowAuthorMutationVariables>;

/**
 * __useUnfollowAuthorMutation__
 *
 * To run a mutation, you first call `useUnfollowAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowAuthorMutation, { data, loading, error }] = useUnfollowAuthorMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useUnfollowAuthorMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowAuthorMutation, UnfollowAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowAuthorMutation, UnfollowAuthorMutationVariables>(UnfollowAuthorDocument, options);
      }
export type UnfollowAuthorMutationHookResult = ReturnType<typeof useUnfollowAuthorMutation>;
export type UnfollowAuthorMutationResult = Apollo.MutationResult<UnfollowAuthorMutation>;
export type UnfollowAuthorMutationOptions = Apollo.BaseMutationOptions<UnfollowAuthorMutation, UnfollowAuthorMutationVariables>;
export const FavoriteNoteDocument = gql`
    mutation favoriteNote($userId: Int!, $noteId: Int!) {
  favoriteNote(userId: $userId, noteId: $noteId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type FavoriteNoteMutationFn = Apollo.MutationFunction<FavoriteNoteMutation, FavoriteNoteMutationVariables>;

/**
 * __useFavoriteNoteMutation__
 *
 * To run a mutation, you first call `useFavoriteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteNoteMutation, { data, loading, error }] = useFavoriteNoteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useFavoriteNoteMutation(baseOptions?: Apollo.MutationHookOptions<FavoriteNoteMutation, FavoriteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoriteNoteMutation, FavoriteNoteMutationVariables>(FavoriteNoteDocument, options);
      }
export type FavoriteNoteMutationHookResult = ReturnType<typeof useFavoriteNoteMutation>;
export type FavoriteNoteMutationResult = Apollo.MutationResult<FavoriteNoteMutation>;
export type FavoriteNoteMutationOptions = Apollo.BaseMutationOptions<FavoriteNoteMutation, FavoriteNoteMutationVariables>;
export const UnfavoriteNoteDocument = gql`
    mutation unfavoriteNote($userId: Int!, $noteId: Int!) {
  unfavoriteNote(userId: $userId, noteId: $noteId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type UnfavoriteNoteMutationFn = Apollo.MutationFunction<UnfavoriteNoteMutation, UnfavoriteNoteMutationVariables>;

/**
 * __useUnfavoriteNoteMutation__
 *
 * To run a mutation, you first call `useUnfavoriteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfavoriteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfavoriteNoteMutation, { data, loading, error }] = useUnfavoriteNoteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useUnfavoriteNoteMutation(baseOptions?: Apollo.MutationHookOptions<UnfavoriteNoteMutation, UnfavoriteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfavoriteNoteMutation, UnfavoriteNoteMutationVariables>(UnfavoriteNoteDocument, options);
      }
export type UnfavoriteNoteMutationHookResult = ReturnType<typeof useUnfavoriteNoteMutation>;
export type UnfavoriteNoteMutationResult = Apollo.MutationResult<UnfavoriteNoteMutation>;
export type UnfavoriteNoteMutationOptions = Apollo.BaseMutationOptions<UnfavoriteNoteMutation, UnfavoriteNoteMutationVariables>;
export const BookmarkNoteDocument = gql`
    mutation bookmarkNote($userId: Int!, $noteId: Int!) {
  bookmarkNote(userId: $userId, noteId: $noteId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type BookmarkNoteMutationFn = Apollo.MutationFunction<BookmarkNoteMutation, BookmarkNoteMutationVariables>;

/**
 * __useBookmarkNoteMutation__
 *
 * To run a mutation, you first call `useBookmarkNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkNoteMutation, { data, loading, error }] = useBookmarkNoteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useBookmarkNoteMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkNoteMutation, BookmarkNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkNoteMutation, BookmarkNoteMutationVariables>(BookmarkNoteDocument, options);
      }
export type BookmarkNoteMutationHookResult = ReturnType<typeof useBookmarkNoteMutation>;
export type BookmarkNoteMutationResult = Apollo.MutationResult<BookmarkNoteMutation>;
export type BookmarkNoteMutationOptions = Apollo.BaseMutationOptions<BookmarkNoteMutation, BookmarkNoteMutationVariables>;
export const UnbookmarkNoteDocument = gql`
    mutation unbookmarkNote($userId: Int!, $noteId: Int!) {
  unbookmarkNote(userId: $userId, noteId: $noteId) {
    id
    fullName
    username
    email
    profileImage
  }
}
    `;
export type UnbookmarkNoteMutationFn = Apollo.MutationFunction<UnbookmarkNoteMutation, UnbookmarkNoteMutationVariables>;

/**
 * __useUnbookmarkNoteMutation__
 *
 * To run a mutation, you first call `useUnbookmarkNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbookmarkNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbookmarkNoteMutation, { data, loading, error }] = useUnbookmarkNoteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useUnbookmarkNoteMutation(baseOptions?: Apollo.MutationHookOptions<UnbookmarkNoteMutation, UnbookmarkNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnbookmarkNoteMutation, UnbookmarkNoteMutationVariables>(UnbookmarkNoteDocument, options);
      }
export type UnbookmarkNoteMutationHookResult = ReturnType<typeof useUnbookmarkNoteMutation>;
export type UnbookmarkNoteMutationResult = Apollo.MutationResult<UnbookmarkNoteMutation>;
export type UnbookmarkNoteMutationOptions = Apollo.BaseMutationOptions<UnbookmarkNoteMutation, UnbookmarkNoteMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    fullName
    username
    about
    email
    profileImage
    followers
    following
    userFollowers {
      ...UserFollower
    }
    userFollowing {
      ...UserFollower
    }
    createdAt
    favorites
    bookmarks
    userBookmarks {
      ...NotesQueryNote
    }
    userFavorites {
      ...NotesQueryNote
    }
  }
}
    ${UserFollowerFragmentDoc}
${NotesQueryNoteFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetAuthorsByNameDocument = gql`
    query GetAuthorsByName($searchString: String!) {
  getAuthorsByName(searchString: $searchString) {
    ...GetAuthorsByNameUser
  }
}
    ${GetAuthorsByNameUserFragmentDoc}`;

/**
 * __useGetAuthorsByNameQuery__
 *
 * To run a query within a React component, call `useGetAuthorsByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsByNameQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useGetAuthorsByNameQuery(baseOptions: Apollo.QueryHookOptions<GetAuthorsByNameQuery, GetAuthorsByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorsByNameQuery, GetAuthorsByNameQueryVariables>(GetAuthorsByNameDocument, options);
      }
export function useGetAuthorsByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsByNameQuery, GetAuthorsByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorsByNameQuery, GetAuthorsByNameQueryVariables>(GetAuthorsByNameDocument, options);
        }
export type GetAuthorsByNameQueryHookResult = ReturnType<typeof useGetAuthorsByNameQuery>;
export type GetAuthorsByNameLazyQueryHookResult = ReturnType<typeof useGetAuthorsByNameLazyQuery>;
export type GetAuthorsByNameQueryResult = Apollo.QueryResult<GetAuthorsByNameQuery, GetAuthorsByNameQueryVariables>;
export const GetAuthorByUsernameDocument = gql`
    query GetAuthorByUsername($username: String!) {
  getAuthorByUsername(username: $username) {
    ...GetAuthorByUsernameUser
  }
}
    ${GetAuthorByUsernameUserFragmentDoc}`;

/**
 * __useGetAuthorByUsernameQuery__
 *
 * To run a query within a React component, call `useGetAuthorByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetAuthorByUsernameQuery(baseOptions: Apollo.QueryHookOptions<GetAuthorByUsernameQuery, GetAuthorByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorByUsernameQuery, GetAuthorByUsernameQueryVariables>(GetAuthorByUsernameDocument, options);
      }
export function useGetAuthorByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorByUsernameQuery, GetAuthorByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorByUsernameQuery, GetAuthorByUsernameQueryVariables>(GetAuthorByUsernameDocument, options);
        }
export type GetAuthorByUsernameQueryHookResult = ReturnType<typeof useGetAuthorByUsernameQuery>;
export type GetAuthorByUsernameLazyQueryHookResult = ReturnType<typeof useGetAuthorByUsernameLazyQuery>;
export type GetAuthorByUsernameQueryResult = Apollo.QueryResult<GetAuthorByUsernameQuery, GetAuthorByUsernameQueryVariables>;