import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import MetadataType from '../metadata';
import Person from '../../classes/person';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import resolveGender from '../../resolvers/gender';
import IdType from '../../scalars/id';

export default new GraphQLObjectType({
  name: 'Person',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    adult: { type: new GraphQLNonNull(GraphQLBoolean) },
    alsoKnownAs: { type: new GraphQLList(GraphQLString) },
    biography: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: GraphQLString },
    deathday: { type: GraphQLString },
    gender: { type: new GraphQLNonNull(GraphQLString), resolve: resolveGender },
    homepage: { type: GraphQLString },
    id: { type: new GraphQLNonNull(IdType) },
    imdbId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    placeOfBirth: { type: GraphQLString },
    popularity: { type: new GraphQLNonNull(GraphQLInt) },
    profilePath: { type: GraphQLString },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Person,
});
