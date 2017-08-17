import { GraphQLObjectType, GraphQLString } from 'graphql';
import Certifications from '../objects/certifications';
import getta from '../../rest-client';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: Certifications,
      args: { format: { type: GraphQLString } },
      resolve: async (obj, args) => {
        if (args.format === 'movie') return getta.getMovieCertifications();
        if (args.format === 'tv') return getta.getTVCertifications();
        return null;
      },
    },
  }),
});
