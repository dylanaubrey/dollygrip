import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import Credit from '../../classes/credit';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import IdType from '../../objects/id';

export default new GraphQLObjectType({
  name: 'Credit',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    creditType: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    // media: { type: MediaType, resolve: resolveMedia },
    mediaType: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(IdType) },
    // person: { type: PersonType, resolve: resolvePerson },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Credit,
});
