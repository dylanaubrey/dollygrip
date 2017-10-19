import { GraphQLUnionType } from 'graphql';
import { MovieConnectionType } from '../../connections/movie';
import { TvConnectionType } from '../../connections/tv';

export default new GraphQLUnionType({
  name: 'MediaConnection',
  types: [MovieConnectionType, TvConnectionType],
});
