import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    iso6391: { type: new GraphQLNonNull(GraphQLString), resolve: obj => obj.iso_639_1 },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
