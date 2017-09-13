import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    iso31661: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});
