/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../graphql/schema/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UpdateUserNewUserInput: { // input type
    email?: string | null; // String
    fullName?: string | null; // String
    profileImage?: string | null; // String
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  AuthErrors: "incorrect-password" | "incorrect-username-or-email" | "username-or-email-already-exists"
  NoteErrors: "user-does-not-exists"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthMutationReturnType: { // root type
    error?: NexusGenEnums['AuthErrors'] | null; // AuthErrors
    token?: string | null; // String
  }
  CreateNoteMutationReturnType: { // root type
    error?: NexusGenEnums['NoteErrors'] | null; // NoteErrors
    note?: NexusGenRootTypes['Note'] | null; // Note
  }
  Mutation: {};
  Note: { // root type
    authorId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isPublished: boolean; // Boolean!
    markdown: string; // String!
    summary: string; // String!
    tags: string[]; // [String!]!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    followers: number[]; // [Int!]!
    following: number[]; // [Int!]!
    fullName: string; // String!
    id: number; // Int!
    profileImage?: string | null; // String
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthMutationReturnType: { // field return type
    error: NexusGenEnums['AuthErrors'] | null; // AuthErrors
    token: string | null; // String
  }
  CreateNoteMutationReturnType: { // field return type
    error: NexusGenEnums['NoteErrors'] | null; // NoteErrors
    note: NexusGenRootTypes['Note'] | null; // Note
  }
  Mutation: { // field return type
    createNote: NexusGenRootTypes['CreateNoteMutationReturnType']; // CreateNoteMutationReturnType!
    createUser: NexusGenRootTypes['AuthMutationReturnType']; // AuthMutationReturnType!
    followAuthor: boolean | null; // Boolean
    signIn: NexusGenRootTypes['AuthMutationReturnType']; // AuthMutationReturnType!
    unfollowAuthor: boolean | null; // Boolean
    updateUserProfile: NexusGenRootTypes['User'] | null; // User
  }
  Note: { // field return type
    author: NexusGenRootTypes['User']; // User!
    authorId: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isPublished: boolean; // Boolean!
    markdown: string; // String!
    summary: string; // String!
    tags: string[]; // [String!]!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    getAllPublishedNotes: Array<NexusGenRootTypes['Note'] | null> | null; // [Note]
    getAuthorsByName: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    getNoteById: NexusGenRootTypes['Note'] | null; // Note
    getNotesByTitle: Array<NexusGenRootTypes['Note'] | null> | null; // [Note]
    getPublishedNotes: Array<NexusGenRootTypes['Note'] | null> | null; // [Note]
    getSavedNotes: Array<NexusGenRootTypes['Note'] | null> | null; // [Note]
    hello: string; // String!
    me: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    followers: number[]; // [Int!]!
    following: number[]; // [Int!]!
    fullName: string; // String!
    id: number; // Int!
    latestNote: NexusGenRootTypes['Note'] | null; // Note
    notes: NexusGenRootTypes['Note'][]; // [Note!]!
    notesCount: number | null; // Int
    profileImage: string | null; // String
    userFollowers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    userFollowing: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthMutationReturnType: { // field return type name
    error: 'AuthErrors'
    token: 'String'
  }
  CreateNoteMutationReturnType: { // field return type name
    error: 'NoteErrors'
    note: 'Note'
  }
  Mutation: { // field return type name
    createNote: 'CreateNoteMutationReturnType'
    createUser: 'AuthMutationReturnType'
    followAuthor: 'Boolean'
    signIn: 'AuthMutationReturnType'
    unfollowAuthor: 'Boolean'
    updateUserProfile: 'User'
  }
  Note: { // field return type name
    author: 'User'
    authorId: 'Int'
    createdAt: 'DateTime'
    id: 'Int'
    isPublished: 'Boolean'
    markdown: 'String'
    summary: 'String'
    tags: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    getAllPublishedNotes: 'Note'
    getAuthorsByName: 'User'
    getNoteById: 'Note'
    getNotesByTitle: 'Note'
    getPublishedNotes: 'Note'
    getSavedNotes: 'Note'
    hello: 'String'
    me: 'User'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    followers: 'Int'
    following: 'Int'
    fullName: 'String'
    id: 'Int'
    latestNote: 'Note'
    notes: 'Note'
    notesCount: 'Int'
    profileImage: 'String'
    userFollowers: 'User'
    userFollowing: 'User'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createNote: { // args
      isPublished: boolean; // Boolean!
      markdown: string; // String!
      summary: string; // String!
      tags: string[]; // [String!]!
      title: string; // String!
      userId: string; // ID!
    }
    createUser: { // args
      email: string; // String!
      fullName: string; // String!
      password: string; // String!
      username: string; // String!
    }
    followAuthor: { // args
      authorId: number; // Int!
      userId: number; // Int!
    }
    signIn: { // args
      email?: string | null; // String
      password: string; // String!
      username?: string | null; // String
    }
    unfollowAuthor: { // args
      authorId: number; // Int!
      userId: number; // Int!
    }
    updateUserProfile: { // args
      newUser: NexusGenInputs['UpdateUserNewUserInput']; // UpdateUserNewUserInput!
      userId: number; // Int!
    }
  }
  Query: {
    getAuthorsByName: { // args
      searchString: string; // String!
    }
    getNoteById: { // args
      noteId: number; // Int!
    }
    getNotesByTitle: { // args
      title: string; // String!
    }
    getPublishedNotes: { // args
      authorId: string; // ID!
    }
    getSavedNotes: { // args
      authorId: string; // ID!
    }
    hello: { // args
      name: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}