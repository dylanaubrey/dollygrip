import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import discoverMovieArgs from '../arguments/discover/movie';
import discoverTvArgs from '../arguments/discover/tv';
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
import resolveMovie from '../resolvers/movie';
import resolvePerson from '../resolvers/person';
import resolveTv from '../resolvers/tv';
import IdType from '../scalars/id';
import MediaConnection from '../unions/media-connection';

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
      type: MediaConnection,
      args: {
        media: { type: new GraphQLNonNull(GraphQLString) },
        ...connectionArgs,
        ...discoverMovieArgs,
        ...discoverTvArgs,
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
