import { GraphQLUnionType } from 'graphql';
import MovieType from '../../objects/movie';
import TvType from '../../objects/tv';

export default new GraphQLUnionType({
  name: 'Media',
  types: [MovieType, TvType],
});
