import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    iso31661: { type: GraphQLString, resolve: obj => obj.iso_3166_1 },
    name: { type: GraphQLString },
  }),
});
