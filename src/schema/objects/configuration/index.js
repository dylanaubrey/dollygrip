import { GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Configuration from '../../classes/configuration';
import APINodeInterface from '../../interfaces/api-node';

const ImageConfigType = new GraphQLObjectType({
  name: 'ImageConfiguration',
  fields: () => ({
    baseUrl: { type: new GraphQLNonNull(GraphQLString) },
    secureBaseUrl: { type: new GraphQLNonNull(GraphQLString) },
    backdropSizes: { type: new GraphQLList(GraphQLString) },
    logoSizes: { type: new GraphQLList(GraphQLString) },
    posterSizes: { type: new GraphQLList(GraphQLString) },
    profileSizes: { type: new GraphQLList(GraphQLString) },
    stillSizes: { type: new GraphQLList(GraphQLString) },
  }),
});

export default new GraphQLObjectType({
  name: 'Configuration',
  interfaces: [APINodeInterface],
  fields: () => ({
    images: { type: ImageConfigType },
    changeKeys: { type: new GraphQLList(GraphQLString) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Configuration,
});
