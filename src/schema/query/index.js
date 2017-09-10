import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import CertificationsType from '../objects/certifications';
import CollectionType from '../objects/collection';
import resolveCertifications from '../resolvers/certifications';
import resolveCollection from '../resolvers/collection';

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
  }),
});
