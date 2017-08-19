import { GraphQLInterfaceType } from 'graphql';
import Metadata from '../../objects/metadata';

export default new GraphQLInterfaceType({
  name: 'RootField',
  fields: () => ({
    _Metadata: { type: Metadata },
  }),
});
