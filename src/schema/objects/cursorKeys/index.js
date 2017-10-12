import { GraphQLObjectType, GraphQLString } from 'graphql';

const CursorKeyType = new GraphQLObjectType({
  name: 'CursorKey',
  fields: () => ({
    type: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

export default new GraphQLObjectType({
  name: 'CursorKeys',
  fields: () => ({
    primary: { type: CursorKeyType },
    secondary: { type: CursorKeyType },
  }),
});
