import { GraphQLUnionType } from 'graphql';
import MovieConnection from '../../connections/movie';
import TvConnection from '../../connections/tv';

export default new GraphQLUnionType({
  name: 'MediaConnection',
  types: [MovieConnection, TvConnection],
  // resolveType
});
