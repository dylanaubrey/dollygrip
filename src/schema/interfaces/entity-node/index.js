import { GraphQLInterfaceType } from 'graphql';
import IdType from '../../objects/id';

export default new GraphQLInterfaceType({
  name: 'EntityNode',
  fields: () => ({
    id: { type: IdType },
  }),
});
