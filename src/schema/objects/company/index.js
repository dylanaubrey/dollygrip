import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import MetadataType from '../metadata';
import MovieType from '../movie';
import Company from '../../classes/company';
import APINodeInterface from '../../interfaces/api-node';
import EntityNodeInterface from '../../interfaces/entity-node';
import resolveCompanyMovies from '../../resolvers/company/movies';

export default new GraphQLObjectType({
  name: 'Company',
  interfaces: [APINodeInterface, EntityNodeInterface],
  fields: () => ({
    description: { type: GraphQLString },
    headquarters: { type: GraphQLString },
    homepage: { type: GraphQLString },
    id: { type: GraphQLInt },
    logoPath: { type: GraphQLString, resolve: obj => obj.logo_path },
    movies: { type: new GraphQLList(MovieType), resolve: resolveCompanyMovies },
    name: { type: GraphQLString },
    parentCompany: { type: GraphQLString, resolve: obj => obj.parent_company },
    _metadata: { type: MetadataType },
  }),
  isTypeOf: value => value instanceof Company,
});
