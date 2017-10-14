import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import CertificationsType from '../objects/certifications';
import CollectionType from '../objects/collection';
import CompanyType from '../objects/company';
import ConfigurationType from '../objects/configuration';
import MovieType from '../objects/movie';
import resolveCertifications from '../resolvers/certifications';
import resolveCollection from '../resolvers/collection';
import resolveCompany from '../resolvers/company';
import resolveConfiguration from '../resolvers/configuration';
import resolveMovie from '../resolvers/movie';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: CertificationsType,
      args: { format: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: resolveCertifications,
    },
    collection: {
      type: CollectionType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: resolveCollection,
    },
    company: {
      type: CompanyType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: resolveCompany,
    },
    configuration: {
      type: ConfigurationType,
      resolve: resolveConfiguration,
    },
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: resolveMovie,
    },
  }),
});
