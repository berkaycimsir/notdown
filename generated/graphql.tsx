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
  createNote: CreateNoteMutationReturnType;
  createUser: AuthMutationReturnType;
  signIn: AuthMutationReturnType;
};


export type MutationCreateNoteArgs = {
  isPublished: Scalars['Boolean'];
  markdown: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignInArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type Note = {
  __typename?: 'Note';
  author: User;
  authorId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
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
  getPublishedNotes?: Maybe<Array<Maybe<Note>>>;
  getSavedNotes?: Maybe<Array<Maybe<Note>>>;
  hello: Scalars['String'];
  me?: Maybe<User>;
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

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type CreateNoteMutationNoteFragment = { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string } };

export type CreateNoteMutationVariables = Exact<{
  title: Scalars['String'];
  markdown: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  userId: Scalars['ID'];
  isPublished: Scalars['Boolean'];
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'CreateNoteMutationReturnType', error?: NoteErrors | null, note?: { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string } } | null } };

export type NotesQueryNoteFragment = { __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string } };

export type GetSavedNotesQueryVariables = Exact<{
  authorId: Scalars['ID'];
}>;


export type GetSavedNotesQuery = { __typename?: 'Query', getSavedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string } } | null> | null };

export type GetPublishedNotesQueryVariables = Exact<{
  authorId: Scalars['ID'];
}>;


export type GetPublishedNotesQuery = { __typename?: 'Query', getPublishedNotes?: Array<{ __typename?: 'Note', id: number, markdown: string, title: string, summary: string, isPublished: boolean, updatedAt: any, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: number, fullName: string, username: string, email: string } } | null> | null };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, fullName: string, username: string, email: string } | null };

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
  }
}
    `;
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
export const MeDocument = gql`
    query Me {
  me {
    id
    fullName
    username
    email
  }
}
    `;

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