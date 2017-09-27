import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    aspectRadio: { type: new GraphQLNonNull(GraphQLFloat) },
    filePath: { type: new GraphQLNonNull(GraphQLString) },
    height: { type: new GraphQLNonNull(GraphQLFloat) },
    iso6391: { type: GraphQLFloat, resolve: obj => obj.iso_639_1 },
    voteAverage: { type: new GraphQLNonNull(GraphQLInt) },
    voteCount: { type: new GraphQLNonNull(GraphQLFloat) },
    width: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
