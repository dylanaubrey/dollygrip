import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const DEFAULT_VALUE = 'string';

export default new GraphQLInputObjectType({
  name: 'CursorInputType',
  fields: () => ({
    order: { type: GraphQLString },
    primaryKey: { type: GraphQLString },
    primaryType: { defaultValue: DEFAULT_VALUE, type: GraphQLString },
    secondaryKey: { type: GraphQLString },
    secondaryType: { type: GraphQLString },
  }),
});
