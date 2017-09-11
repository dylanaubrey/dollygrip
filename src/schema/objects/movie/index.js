import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import Metadata from '../metadata';
import Movie from '../../classes/movie';
import APINode from '../../interfaces/api-node';
import EntityNode from '../../interfaces/entity-node';
import CollectionType from '../../objects/collection';
import resolveCollection from '../../resolvers/collection';

export default new GraphQLObjectType({
  name: 'Movie',
  interfaces: [APINode, EntityNode],
  fields: () => ({
    adult: { type: GraphQLBoolean },
    backdropPath: { type: GraphQLString, resolve: obj => obj.backdrop_path },
    collection: { type: CollectionType, resolve: resolveCollection },
    budget: { type: GraphQLInt },
    // genres: { type: new GraphQLList(GenreType), resolve: resolveGenreList },
    homepage: { type: GraphQLString },
    id: { type: GraphQLInt },
    imdbId: { type: GraphQLString, resolve: obj => obj.imdb_id },
    originalLanguage: { type: GraphQLString, resolve: obj => obj.original_language },
    originalTitle: { type: GraphQLString, resolve: obj => obj.original_title },
    overview: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    posterPath: { type: GraphQLString, resolve: obj => obj.poster_path },
    // productionCompanies: { type: new GraphQLList(CompanyType), resolve: resolveCompanyList },
    releaseDate: { type: GraphQLString, resolve: obj => obj.release_date },
    revenue: { type: GraphQLInt },
    runtime: { type: GraphQLInt },
    status: { type: GraphQLString },
    tagline: { type: GraphQLString },
    title: { type: GraphQLString },
    video: { type: GraphQLBoolean },
    voteAverage: { type: GraphQLInt, resolve: obj => obj.vote_average },
    voteCount: { type: GraphQLInt, resolve: obj => obj.vote_count },
    _metadata: { type: Metadata },
  }),
  isTypeOf: value => value instanceof Movie,
});
