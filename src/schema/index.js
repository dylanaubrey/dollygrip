import { GraphQLSchema } from 'graphql';
import { MovieConnectionType, MovieEdgeType } from './connections/movie';
import { TvConnectionType, TvEdgeType } from './connections/tv';
import APINodeInterface from './interfaces/api-node';
import EntityNodeInterface from './interfaces/entity-node';
import CertificationsType from './objects/certifications';
import CollectionType from './objects/collection';
import CompanyType from './objects/company';
import ConfigurationType from './objects/configuration';
import CreditType from './objects/credit';
import MovieType from './objects/movie';
import PersonType from './objects/person';
import TvType from './objects/tv';
import Query from './query';
import IdType from './scalars/id';
import MediaType from './unions/media';
import MediaConnectionType from './unions/media-connection';

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
    MediaConnectionType,
    MediaType,
    MovieConnectionType,
    MovieEdgeType,
    MovieType,
    PersonType,
    TvConnectionType,
    TvEdgeType,
    TvType,
  ],
});
