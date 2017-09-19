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
    aspectRadio: { type: new GraphQLNonNull(GraphQLFloat), resolve: obj => obj.aspect_ratio },
    filePath: { type: new GraphQLNonNull(GraphQLString), resolve: obj => obj.file_path },
    height: { type: new GraphQLNonNull(GraphQLFloat) },
    iso6391: { type: GraphQLFloat, resolve: obj => obj.iso_639_1 },
    voteAverage: { type: new GraphQLNonNull(GraphQLInt), resolve: obj => obj.vote_average },
    voteCount: { type: new GraphQLNonNull(GraphQLFloat), resolve: obj => obj.vote_count },
    width: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
