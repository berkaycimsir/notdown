import path from 'path';
import {
  asNexusMethod,
  makeSchema,
  nonNull,
  queryField,
  stringArg,
} from 'nexus';
import { UserTypes } from './user';
import { NoteTypes } from './note';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);

const HelloQuery = queryField('hello', {
  type: nonNull('String'),
  args: {
    name: nonNull(stringArg()),
  },
  resolve: (_, { name }) => `Hello ${name}`,
});

export const schema = makeSchema({
  types: [
    HelloQuery,
    ...UserTypes,
    ...NoteTypes,
    asNexusMethod(dateTimeScalar, 'dateTime'),
  ],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'graphql/schema', 'context.ts'),
    export: 'Context',
  },
});
