import schemaLang from "@dollygrip/schema";
import { getChildFields, getName, getOperationDefinitions } from "@graphql-box/helpers";
import { FieldNode, GraphQLObjectType, GraphQLResolveInfo, buildSchema, parse } from "graphql";

export default function buildResolveInfoArg(request: string, rootFieldName?: string): GraphQLResolveInfo {
  const ast = parse(request);
  const operationDefinition = getOperationDefinitions(ast)[0];
  const rootFieldNode = getChildFields(operationDefinition, rootFieldName)?.[0]?.fieldNode as FieldNode;
  const fieldName = getName(rootFieldNode) as string;
  const graphqlSchema = buildSchema(schemaLang);
  const mockType = {};

  return {
    fieldName,
    fieldNodes: getChildFields(rootFieldNode)?.map(({ fieldNode }) => fieldNode) as FieldNode[],
    fragments: {},
    operation: operationDefinition,
    parentType: mockType as GraphQLObjectType,
    path: { key: 0, prev: undefined },
    returnType: mockType as GraphQLObjectType,
    rootValue: null,
    schema: graphqlSchema,
    variableValues: {},
  };
}
