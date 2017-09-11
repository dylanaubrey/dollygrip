import { GraphQLInt, GraphQLInterfaceType } from 'graphql';

export default new GraphQLInterfaceType({
  name: 'EntityNode',
  fields: () => ({
    id: { type: GraphQLInt },
  }),
});
