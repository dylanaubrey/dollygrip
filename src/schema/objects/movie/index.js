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
import IdType from '../../objects/id';
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
    backdropPath: { type: GraphQLString },
    belongsToCollection: { type: CollectionType, resolve: resolveCollection },
    budget: { type: new GraphQLNonNull(GraphQLInt) },
    // genres: { type: new GraphQLList(GenreType), resolve: resolveGenreList },
    genreIds: { type: new GraphQLList(GraphQLInt) },
    homepage: { type: GraphQLString },
    id: { type: new GraphQLNonNull(IdType) },
    imdbId: { type: GraphQLString },
    originalLanguage: { type: new GraphQLNonNull(GraphQLString) },
    originalTitle: { type: new GraphQLNonNull(GraphQLString) },
    overview: { type: GraphQLString },
    popularity: { type: new GraphQLNonNull(GraphQLFloat) },
    posterPath: { type: GraphQLString },
    productionCompanies: { type: new GraphQLList(CompanyType), resolve: resolveCompanyList },
    productionCountries: { type: new GraphQLList(CountryType) },
    releaseDate: { type: new GraphQLNonNull(GraphQLString) },
    revenue: { type: new GraphQLNonNull(GraphQLInt) },
    runtime: { type: GraphQLInt },
    spokenLanguages: { type: new GraphQLList(LanguageType) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    tagline: { type: GraphQLString },
    title: { type: new GraphQLNonNull(GraphQLString) },
    video: { type: new GraphQLNonNull(GraphQLBoolean) },
    voteAverage: { type: new GraphQLNonNull(GraphQLFloat) },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Movie,
});
