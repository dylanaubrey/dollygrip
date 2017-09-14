import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Collection from '../../classes/collection';
import APINode from '../../interfaces/api-node';
import EntityNode from '../../interfaces/entity-node';
import MediaImagesType from '../../objects/media-images';
import MovieType from '../../objects/movie';
import resolveCollectionImages from '../../resolvers/collection/images';
import resolveMovieList from '../../resolvers/movie-list';

export default new GraphQLObjectType({
  name: 'Collection',
  interfaces: [APINode, EntityNode],
  fields: () => ({
    backdropPath: { type: GraphQLString, resolve: obj => obj.backdrop_path },
    id: { type: GraphQLInt },
    images: { type: MediaImagesType, resolve: resolveCollectionImages },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    parts: { type: new GraphQLList(MovieType), resolve: resolveMovieList },
    posterPath: { type: GraphQLString, resolve: obj => obj.poster_path },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Collection,
});
