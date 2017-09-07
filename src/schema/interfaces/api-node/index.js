import { GraphQLInterfaceType } from 'graphql';
import Metadata from '../../objects/metadata';

export default new GraphQLInterfaceType({
  name: 'APINode',
  fields: () => ({
    _metadata: { type: Metadata },
  }),
});
