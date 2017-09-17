import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import CountryType from '../country';
import LanguageType from '../language';
import MetadataType from '../metadata';
import Movie from '../../classes/movie';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import CollectionType from '../../objects/collection';
import resolveCollection from '../../resolvers/collection';

export default new GraphQLObjectType({
  name: 'Movie',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    adult: { type: GraphQLBoolean },
    backdropPath: { type: GraphQLString, resolve: obj => obj.backdrop_path },
    belongsToCollection: { type: CollectionType, resolve: resolveCollection },
    budget: { type: GraphQLInt },
    // genres: { type: new GraphQLList(GenreType), resolve: resolveGenreList },
    genreIds: { type: new GraphQLList(GraphQLInt), resolve: obj => obj.genre_ids },
    homepage: { type: GraphQLString },
    id: { type: GraphQLInt },
    imdbId: { type: GraphQLString, resolve: obj => obj.imdb_id },
    originalLanguage: { type: GraphQLString, resolve: obj => obj.original_language },
    originalTitle: { type: GraphQLString, resolve: obj => obj.original_title },
    overview: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    posterPath: { type: GraphQLString, resolve: obj => obj.poster_path },
    // productionCompanies: { type: new GraphQLList(CompanyType), resolve: resolveCompanyList },
    productionCountries: {
      type: new GraphQLList(CountryType),
      resolve: obj => obj.production_countries,
    },
    releaseDate: { type: GraphQLString, resolve: obj => obj.release_date },
    revenue: { type: GraphQLInt },
    runtime: { type: GraphQLInt },
    spokenLanguages: {
      type: new GraphQLList(LanguageType),
      resolve: obj => obj.spoken_languages,
    },
    status: { type: GraphQLString },
    tagline: { type: GraphQLString },
    title: { type: GraphQLString },
    video: { type: GraphQLBoolean },
    voteAverage: { type: GraphQLFloat, resolve: obj => obj.vote_average },
    voteCount: { type: GraphQLInt, resolve: obj => obj.vote_count },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Movie,
});
