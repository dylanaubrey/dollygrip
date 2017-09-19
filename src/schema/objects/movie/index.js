import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import CompanyType from '../company';
import CountryType from '../country';
import LanguageType from '../language';
import MetadataType from '../metadata';
import Movie from '../../classes/movie';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import CollectionType from '../../objects/collection';
import resolveCollection from '../../resolvers/collection';
import resolveCompanyList from '../../resolvers/company-list';

export default new GraphQLObjectType({
  name: 'Movie',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    adult: { type: new GraphQLNonNull(GraphQLBoolean) },
    backdropPath: { type: GraphQLString, resolve: obj => obj.backdrop_path },
    belongsToCollection: { type: CollectionType, resolve: resolveCollection },
    budget: { type: new GraphQLNonNull(GraphQLInt) },
    // genres: { type: new GraphQLList(GenreType), resolve: resolveGenreList },
    genreIds: { type: new GraphQLList(GraphQLInt), resolve: obj => obj.genre_ids },
    homepage: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    imdbId: { type: GraphQLString, resolve: obj => obj.imdb_id },
    originalLanguage: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => obj.original_language,
    },
    originalTitle: { type: new GraphQLNonNull(GraphQLString), resolve: obj => obj.original_title },
    overview: { type: GraphQLString },
    popularity: { type: new GraphQLNonNull(GraphQLFloat) },
    posterPath: { type: GraphQLString, resolve: obj => obj.poster_path },
    productionCompanies: { type: new GraphQLList(CompanyType), resolve: resolveCompanyList },
    productionCountries: {
      type: new GraphQLList(CountryType),
      resolve: obj => obj.production_countries,
    },
    releaseDate: { type: new GraphQLNonNull(GraphQLString), resolve: obj => obj.release_date },
    revenue: { type: new GraphQLNonNull(GraphQLInt) },
    runtime: { type: GraphQLInt },
    spokenLanguages: {
      type: new GraphQLList(LanguageType),
      resolve: obj => obj.spoken_languages,
    },
    status: { type: new GraphQLNonNull(GraphQLString) },
    tagline: { type: GraphQLString },
    title: { type: new GraphQLNonNull(GraphQLString) },
    video: { type: new GraphQLNonNull(GraphQLBoolean) },
    voteAverage: { type: new GraphQLNonNull(GraphQLFloat), resolve: obj => obj.vote_average },
    voteCount: { type: new GraphQLNonNull(GraphQLInt), resolve: obj => obj.vote_count },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Movie,
});
