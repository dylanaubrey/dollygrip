import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    aspectRadio: { type: GraphQLFloat, resolve: obj => obj.aspect_ratio },
    filePath: { type: GraphQLString, resolve: obj => obj.file_path },
    height: { type: GraphQLFloat },
    iso6391: { type: GraphQLFloat, resolve: obj => obj.iso_639_1 },
    voteAverage: { type: GraphQLInt, resolve: obj => obj.vote_average },
    voteCount: { type: GraphQLFloat, resolve: obj => obj.vote_count },
    width: { type: GraphQLFloat },
  }),
});
