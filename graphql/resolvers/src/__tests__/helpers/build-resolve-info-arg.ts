import graphqlSchema from '@dollygrip/schema';
import { ParentNode, getChildFields, getName, getOperationDefinitions } from '@graphql-box/helpers';
import { FieldNode, GraphQLObjectType, GraphQLResolveInfo, parse } from 'graphql';

export default function buildResolveInfoArg(request: string, path: string[]): GraphQLResolveInfo {
  const ast = parse(request);
  const operationDefinitions = getOperationDefinitions(ast);

  const fieldNodes = path.reduce((nodes: ParentNode[], pathEntry) => {
    const childFieldNodes = getChildFields(nodes[0] as ParentNode, pathEntry)?.map(
      ({ fieldNode }) => fieldNode
    ) as FieldNode[];

    return childFieldNodes || nodes;
  }, operationDefinitions) as FieldNode[];

  const fieldName = (fieldNodes[0] ? getName(fieldNodes[0]) : undefined) || '';
  const mockType = {};

  return {
    fieldName,
    fieldNodes,
    fragments: {},
    operation: operationDefinitions[0],
    parentType: mockType as GraphQLObjectType,
    path: { key: 0, prev: undefined, typename: '' },
    returnType: mockType as GraphQLObjectType,
    rootValue: null,
    schema: graphqlSchema,
    variableValues: {},
  } as GraphQLResolveInfo;
}
