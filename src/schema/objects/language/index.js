import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    iso6391: { type: GraphQLString, resolve: obj => obj.iso_639_1 },
    name: { type: GraphQLString },
  }),
});
