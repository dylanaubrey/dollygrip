import { GraphQLSchema } from 'graphql';
import APINode from './interfaces/api-node';
import EntityNode from './interfaces/entity-node';
import CertificationsType from './objects/certifications';
import CollectionType from './objects/collection';
import Query from './query';

export default new GraphQLSchema({
  query: Query,
  types: [APINode, EntityNode, CertificationsType, CollectionType],
});
