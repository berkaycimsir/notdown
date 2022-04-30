import path from 'path';
import { makeSchema, nonNull, objectType, queryField, stringArg } from 'nexus';
import { UserTypes } from './user';

const HelloQuery = queryField('hello', {
  type: nonNull('String'),
  args: {
    name: nonNull(stringArg()),
  },
  resolve: (_, { name }) => `Hello ${name}`,
});

export const schema = makeSchema({
  types: [HelloQuery, ...UserTypes],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'schema', 'context.ts'),
    export: 'Context',
  },
});
