import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    iso6391: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});
