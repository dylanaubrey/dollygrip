import { GraphQLObjectType, GraphQLString } from 'graphql';
import { get } from 'lodash';
import Certifications from '../objects/certifications';
import getta from '../../rest-client';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: Certifications,
      args: { format: { type: GraphQLString } },
      resolve: async (obj, args) => {
        let res;
        if (args.format === 'movie') res = await getta.getMovieCertifications();
        if (args.format === 'tv') res = await getta.getTVCertifications();
        return get(res, ['data', '0', 'certifications'], null);
      },
    },
  }),
});
