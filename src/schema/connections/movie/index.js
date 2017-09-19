import { connectionDefinitions } from 'graphql-relay';
import MovieType from '../../objects/movie';

const { connectionType: MovieConnection } = connectionDefinitions({
  name: 'Movie',
  nodeType: MovieType,
});

export default MovieConnection;
