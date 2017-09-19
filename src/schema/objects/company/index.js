import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
// import { connectionArgs } from 'graphql-relay';
import MetadataType from '../metadata';
import Company from '../../classes/company';
// import MovieConnection from '../../connections/movie';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
// import resolveCompanyMovies from '../../resolvers/company/movies';

export default new GraphQLObjectType({
  name: 'Company',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    description: { type: GraphQLString },
    headquarters: { type: new GraphQLNonNull(GraphQLString) },
    homepage: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    logoPath: { type: GraphQLString, resolve: obj => obj.logo_path },
    // movies: { type: MovieConnection, args: connectionArgs, resolve: resolveCompanyMovies },
    name: { type: new GraphQLNonNull(GraphQLString) },
    parentCompany: { type: GraphQLString, resolve: obj => obj.parent_company },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Company,
});
