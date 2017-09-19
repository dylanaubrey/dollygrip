import { GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLObjectType } from 'graphql';
import MetadataType from '../metadata';
import MediaImages from '../../classes/media-images';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import ImageType from '../image';

export default new GraphQLObjectType({
  name: 'MediaImages',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    backdrops: { type: new GraphQLList(ImageType) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    posters: { type: new GraphQLList(ImageType) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof MediaImages,
});
