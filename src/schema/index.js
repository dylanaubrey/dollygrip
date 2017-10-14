import { GraphQLSchema } from 'graphql';
import { MovieConnection, MovieEdge } from './connections/movie';
import APINodeInterface from './interfaces/api-node';
import EntityNodeInterface from './interfaces/entity-node';
import CertificationsType from './objects/certifications';
import CollectionType from './objects/collection';
import CompanyType from './objects/company';
import ConfigurationType from './objects/configuration';
import CreditType from './objects/credit';
import MovieType from './objects/movie';
import TvType from './objects/tv';
import Query from './query';
import IdType from './scalars/id';
import MediaType from './unions/media';

export default new GraphQLSchema({
  query: Query,
  types: [
    APINodeInterface,
    CertificationsType,
    CollectionType,
    CompanyType,
    ConfigurationType,
    CreditType,
    EntityNodeInterface,
    IdType,
    MediaType,
    MovieConnection,
    MovieEdge,
    MovieType,
    TvType,
  ],
});
