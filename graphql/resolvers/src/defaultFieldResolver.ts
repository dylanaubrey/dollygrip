import type { FieldNode, GraphQLFieldResolver } from 'graphql';
import { snakeCase } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFieldResolver: GraphQLFieldResolver<Record<string, any>, any> = (obj, _args, _context, { fieldNodes }) => {
  const currentField = fieldNodes[0] as FieldNode;
  const name = currentField.name.value;

  if ({}.hasOwnProperty.call(obj, name)) {
    return obj[name]; // eslint-disable-line @typescript-eslint/no-unsafe-return
  }

  return obj[snakeCase(name)]; // eslint-disable-line @typescript-eslint/no-unsafe-return
};

export default defaultFieldResolver;
