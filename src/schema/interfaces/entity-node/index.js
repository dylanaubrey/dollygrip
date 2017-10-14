import { GraphQLInterfaceType } from 'graphql';
import IdType from '../../scalars/id';

export default new GraphQLInterfaceType({
  name: 'EntityNode',
  fields: () => ({
    id: { type: IdType },
  }),
});
