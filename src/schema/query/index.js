import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import CertificationsType from '../objects/certifications';
import CollectionType from '../objects/collection';
import CompanyType from '../objects/company';
import ConfigurationType from '../objects/configuration';
import CreditType from '../objects/credit';
import MovieType from '../objects/movie';
import resolveCertifications from '../resolvers/certifications';
import resolveCollection from '../resolvers/collection';
import resolveCompany from '../resolvers/company';
import resolveConfiguration from '../resolvers/configuration';
import resolveCredit from '../resolvers/credit';
import resolveMovie from '../resolvers/movie';
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
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(IdType) } },
      resolve: resolveMovie,
    },
  }),
});
