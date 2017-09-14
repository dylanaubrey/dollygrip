import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import MetadataType from '../metadata';
import MediaImages from '../../classes/media-images';
import APINode from '../../interfaces/api-node';
import EntityNode from '../../interfaces/entity-node';
import ImageType from '../image';

export default new GraphQLObjectType({
  name: 'MediaImages',
  interfaces: [APINode, EntityNode],
  fields: () => ({
    backdrops: { type: new GraphQLList(ImageType) },
    id: { type: GraphQLInt },
    posters: { type: new GraphQLList(ImageType) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof MediaImages,
});
