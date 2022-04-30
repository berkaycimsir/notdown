module.exports = {
  schema: './generated/schema.graphql',
  documents: ['./graphql/**/*.graphql'],
  overwrite: true,
  generates: {
    './generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
