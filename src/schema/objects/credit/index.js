import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Credit from '../../classes/credit';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import resolveMedia from '../../resolvers/media';
import IdType from '../../scalars/id';
import MediaType from '../../unions/media';

export default new GraphQLObjectType({
  name: 'Credit',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    character: { type: new GraphQLNonNull(GraphQLString), resolve: obj => obj.media.character },
    creditType: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(IdType) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    media: { type: MediaType, resolve: resolveMedia },
    mediaType: { type: new GraphQLNonNull(GraphQLString) },
    // person: { type: PersonType, resolve: resolvePerson },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Credit,
});
