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
import MetadataType from '../metadata';
import Tv from '../../classes/tv';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import resolveCompanyList from '../../resolvers/company-list';
import IdType from '../../scalars/id';

export default new GraphQLObjectType({
  name: 'Tv',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    backdropPath: { type: GraphQLString },
    // createdBy: { type: PersonType, resolve: resolvePerson },
    episodeRunTime: { type: new GraphQLList(GraphQLInt) },
    firstAirDate: { type: new GraphQLNonNull(GraphQLString) },
    // genres: { type: new GraphQLList(GenreType), resolve: resolveGenreList },
    homepage: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(IdType) },
    inProduction: { type: new GraphQLNonNull(GraphQLBoolean) },
    languages: { type: new GraphQLList(GraphQLString) },
    lastAirDate: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    networks: { type: new GraphQLList(CompanyType), resolve: resolveCompanyList },
    numberOfEpisodes: { type: new GraphQLList(GraphQLInt) },
    numberOfSeasons: { type: new GraphQLList(GraphQLInt) },
    originCountry: { type: new GraphQLList(GraphQLString) },
    originalLanguage: { type: new GraphQLNonNull(GraphQLString) },
    originalName: { type: new GraphQLNonNull(GraphQLString) },
    overview: { type: new GraphQLNonNull(GraphQLString) },
    popularity: { type: new GraphQLNonNull(GraphQLFloat) },
    posterPath: { type: GraphQLString },
    productionCompanies: { type: new GraphQLList(CompanyType), resolve: resolveCompanyList },
    // seasons: { type: new GraphQLList(SeasonType), resolve: resolveSeasonList },
    status: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    voteAverage: { type: new GraphQLNonNull(GraphQLFloat) },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Tv,
});
