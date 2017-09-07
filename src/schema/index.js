import { GraphQLSchema } from 'graphql';
import APINode from './interfaces/api-node';
import Certifications from './objects/certifications';
import Query from './query';

export default new GraphQLSchema({
  query: Query,
  types: [APINode, Certifications],
});
