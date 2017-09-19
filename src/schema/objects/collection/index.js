import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Collection from '../../classes/collection';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import MediaImagesType from '../../objects/media-images';
import MovieType from '../../objects/movie';
import resolveCollectionImages from '../../resolvers/collection/images';
import resolveMovieList from '../../resolvers/movie-list';

export default new GraphQLObjectType({
  name: 'Collection',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    backdropPath: { type: GraphQLString, resolve: obj => obj.backdrop_path },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    images: { type: MediaImagesType, resolve: resolveCollectionImages },
    name: { type: new GraphQLNonNull(GraphQLString) },
    overview: { type: new GraphQLNonNull(GraphQLString) },
    parts: { type: new GraphQLList(MovieType), resolve: resolveMovieList },
    posterPath: { type: GraphQLString, resolve: obj => obj.poster_path },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Collection,
});
