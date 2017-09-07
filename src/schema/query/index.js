import { GraphQLObjectType, GraphQLString } from 'graphql';
import CertificationsType from '../objects/certifications';
import resolveCertifications from '../resolvers/certifications';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: CertificationsType,
      args: { format: { type: GraphQLString } },
      resolve: resolveCertifications,
    },
  }),
});
