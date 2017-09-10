import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import Metadata from '../metadata';
import Collection from '../../classes/collection';
import APINode from '../../interfaces/api-node';
import EntityNode from '../../interfaces/entity-node';
import MovieType from '../../objects/movie';
import resolveMovieList from '../../resolvers/movie-list';

export default new GraphQLObjectType({
  name: 'Collection',
  interfaces: [APINode, EntityNode],
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    posterPath: { type: GraphQLString, resolve: obj => obj.poster_path },
    backdropPath: { type: GraphQLString, resolve: obj => obj.backdrop_path },
    parts: { type: new GraphQLList(MovieType), resolve: resolveMovieList },
    _metadata: { type: Metadata },
  }),
  isTypeOf: value => value instanceof Collection,
});
