import path from 'path';
import { makeSchema, nonNull, objectType, queryField, stringArg } from 'nexus';
import { UserType } from './user';

const Types = [UserType];

const HelloQuery = queryField('hello', {
  type: nonNull('String'),
  args: {
    name: nonNull(stringArg()),
  },
  resolve: (_, { name }) => `Hello ${name}`,
});

export const schema = makeSchema({
  types: [HelloQuery, ...Types],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
});
