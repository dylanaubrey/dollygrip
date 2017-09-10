import { GraphQLInt, GraphQLInterfaceType } from 'graphql';

export default new GraphQLInterfaceType({
  name: 'APINode',
  fields: () => ({
    id: { type: GraphQLInt },
  }),
});
