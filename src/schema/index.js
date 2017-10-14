import { GraphQLSchema } from 'graphql';
import { MovieConnection, MovieEdge } from './connections/movie';
import APINodeInterface from './interfaces/api-node';
import EntityNodeInterface from './interfaces/entity-node';
import CertificationsType from './objects/certifications';
import CollectionType from './objects/collection';
import CompanyType from './objects/company';
import ConfigurationType from './objects/configuration';
import MovieType from './objects/movie';
import Query from './query';

export default new GraphQLSchema({
  query: Query,
  types: [
    APINodeInterface,
    CertificationsType,
    CollectionType,
    CompanyType,
    ConfigurationType,
    EntityNodeInterface,
    MovieConnection,
    MovieEdge,
    MovieType,
  ],
});
