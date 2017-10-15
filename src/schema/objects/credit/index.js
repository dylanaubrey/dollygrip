import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { get } from 'lodash';
import MetadataType from '../metadata';
import Credit from '../../classes/credit';
import { resolveObject } from '../../helpers';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import PersonType from '../../objects/person';
import resolveMedia from '../../resolvers/media';
import resolvePerson from '../../resolvers/person';
import IdType from '../../scalars/id';
import MediaType from '../../unions/media';

export default new GraphQLObjectType({
  name: 'Credit',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    character: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => get(obj, ['media', 'character']),
    },
    creditType: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(IdType) },
    job: { type: new GraphQLNonNull(GraphQLString) },
    media: { type: MediaType, resolve: resolveMedia },
    mediaType: { type: new GraphQLNonNull(GraphQLString) },
    person: { type: PersonType, resolve: (...args) => resolveObject(...args, resolvePerson) },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Credit,
});
