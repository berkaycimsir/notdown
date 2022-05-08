import path from 'path';
import { makeSchema, nonNull, queryField, stringArg } from 'nexus';
import { UserTypes } from './user';
import { NoteTypes } from './note';

const HelloQuery = queryField('hello', {
  type: nonNull('String'),
  args: {
    name: nonNull(stringArg()),
  },
  resolve: (_, { name }) => `Hello ${name}`,
});

export const schema = makeSchema({
  types: [HelloQuery, ...UserTypes, ...NoteTypes],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'schema', 'context.ts'),
    export: 'Context',
  },
});
