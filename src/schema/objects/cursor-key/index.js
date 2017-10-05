import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'CursorKey',
  fields: () => ({
    value: { type: GraphQLString },
  }),
});
