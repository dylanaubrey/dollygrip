import { connectionDefinitions } from 'graphql-relay';
import MovieType from '../../objects/movie';
import resolveMovie from '../../resolvers/movie';

const { connectionType: MovieConnection } = connectionDefinitions({
  name: 'Movie',
  nodeType: MovieType,
  resolveNode: resolveMovie,
  // resolveCursor?: ?GraphQLFieldResolver<*, *>, NOTE: Cursor is the sort order position
  // edgeFields?: ?Thunk<GraphQLFieldConfigMap<*, *>>,
  // connectionFields?: ?Thunk<GraphQLFieldConfigMap<*, *>>,
});

export default MovieConnection;
