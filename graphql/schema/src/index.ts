import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { join } from 'path';
import preval from 'preval.macro';

export const typeDefs = preval`
  const fs = require('fs');
  const path = require('path');
  module.exports = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf8');
` as string;

export * from './types';
export default loadSchemaSync(join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] });
