import { GraphQLObjectType, GraphQLString } from 'graphql';
import { get } from 'lodash';
import Certifications from '../classes/certifications';
import CertificationsType from '../objects/certifications';
import getta from '../../rest-client';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    certifications: {
      type: CertificationsType,
      args: { format: { type: GraphQLString } },
      resolve: async (obj, args) => {
        let res;
        if (args.format === 'movie') res = await getta.getMovieCertifications();
        if (args.format === 'tv') res = await getta.getTVCertifications();
        const data = get(res, ['data', '0', 'certifications'], null);
        if (!data) return null;
        const cacheControl = get(res, ['metadata', '0', 'cacheControl'], null);
        if (cacheControl) data._metadata = { cacheControl };
        return new Certifications(data);
      },
    },
  }),
});
