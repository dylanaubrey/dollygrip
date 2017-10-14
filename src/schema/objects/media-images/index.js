import { GraphQLNonNull, GraphQLList, GraphQLObjectType } from 'graphql';
import ImageType from '../image';
import MetadataType from '../metadata';
import MediaImages from '../../classes/media-images';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import IdType from '../../objects/id';

export default new GraphQLObjectType({
  name: 'MediaImages',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    backdrops: { type: new GraphQLList(ImageType) },
    id: { type: new GraphQLNonNull(IdType) },
    posters: { type: new GraphQLList(ImageType) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof MediaImages,
});
