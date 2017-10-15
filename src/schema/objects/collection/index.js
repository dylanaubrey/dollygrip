import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Collection from '../../classes/collection';
import { resolveList } from '../../helpers';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import MediaImagesType from '../../objects/media-images';
import MovieType from '../../objects/movie';
import resolveCollectionImages from '../../resolvers/collection/images';
import resolveMovie from '../../resolvers/movie';
import IdType from '../../scalars/id';

export default new GraphQLObjectType({
  name: 'Collection',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    backdropPath: { type: GraphQLString },
    id: { type: new GraphQLNonNull(IdType) },
    images: { type: MediaImagesType, resolve: resolveCollectionImages },
    name: { type: new GraphQLNonNull(GraphQLString) },
    overview: { type: new GraphQLNonNull(GraphQLString) },
    parts: {
      type: new GraphQLList(MovieType),
      resolve: (...args) => resolveList(...args, resolveMovie),
    },
    posterPath: { type: GraphQLString },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Collection,
});
