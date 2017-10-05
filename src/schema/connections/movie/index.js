import { connectionDefinitions } from 'graphql-relay';
import { toID } from '../../helpers';
import CursorKeyType from '../../objects/cursor-key';
import MetadataType from '../../objects/metadata';
import MovieType from '../../objects/movie';
import resolveMovie from '../../resolvers/movie';

const { connectionType: MovieConnection } = connectionDefinitions({
  name: 'Movie',
  nodeType: MovieType,
  resolveNode: resolveMovie,
  resolveCursor: ({ cursorKey, node }) => (node ? toID(node[cursorKey], node.id) : null),
  edgeFields: { cursorKey: CursorKeyType },
  connectionFields: { _metadata: MetadataType },
});

export default MovieConnection;
