import { GraphQLInputObjectType } from 'graphql';
import { connectionArgs } from 'graphql-relay';

export default new GraphQLInputObjectType({
  name: 'ConnectionInput',
  fields: () => ({ ...connectionArgs }),
});
