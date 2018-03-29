import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { DiscoverConnectionType } from '../connections/discover/';
import ConnectionInputType from '../input-objects/connection';
import CursorInputType from '../input-objects/cursor';
import DiscoverMovieInputType from '../input-objects/discover/movie';
import DiscoverTvInputType from '../input-objects/discover/tv';
import CertificationsType from '../objects/certifications';
import CollectionType from '../objects/collection';
import CompanyType from '../objects/company';
import ConfigurationType from '../objects/configuration';
import CreditType from '../objects/credit';
import MovieType from '../objects/movie';
import PersonType from '../objects/person';
import TvType from '../objects/tv';
import resolveCertifications from '../resolvers/certifications';
import resolveCollection from '../resolvers/collection';
import resolveCompany from '../resolvers/company';
import resolveConfiguration from '../resolvers/configuration';
import resolveCredit from '../resolvers/credit';
import resolveDiscover from '../resolvers/discover';
import resolveMovie from '../resolvers/movie';
import resolvePerson from '../resolvers/person';
import resolveTv from '../resolvers/tv';
import IdType from '../scalars/id';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: CertificationsType,
      args: { media: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: resolveCertifications,
    },
    collection: {
      type: CollectionType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolveCollection,
    },
    company: {
      type: CompanyType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolveCompany,
    },
    configuration: {
      type: ConfigurationType,
      resolve: resolveConfiguration,
    },
    credit: {
      type: CreditType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolveCredit,
    },
    discover: {
      type: DiscoverConnectionType,
      args: {
        media: { type: new GraphQLNonNull(GraphQLString) },
        connection: { type: ConnectionInputType },
        cursor: { type: CursorInputType },
        movie: { type: DiscoverMovieInputType },
        tv: { type: DiscoverTvInputType },
      },
      resolve: resolveDiscover,
    },
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolveMovie,
    },
    person: {
      type: PersonType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolvePerson,
    },
    tv: {
      type: TvType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolveTv,
    },
  }),
});
