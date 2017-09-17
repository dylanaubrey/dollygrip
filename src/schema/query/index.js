import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import CertificationsType from '../objects/certifications';
import CollectionType from '../objects/collection';
// import CompanyType from '../objects/company';
import MovieType from '../objects/movie';
import resolveCertifications from '../resolvers/certifications';
import resolveCollection from '../resolvers/collection';
// import resolveCompany from '../resolvers/company';
import resolveMovie from '../resolvers/movie';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: CertificationsType,
      args: { format: { type: GraphQLString } },
      resolve: resolveCertifications,
    },
    collection: {
      type: CollectionType,
      args: { id: { type: GraphQLInt } },
      resolve: resolveCollection,
    },
    // company: {
    //   type: CompanyType,
    //   args: { id: { type: GraphQLInt } },
    //   resolve: resolveCompany,
    // },
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLInt } },
      resolve: resolveMovie,
    },
  }),
});
