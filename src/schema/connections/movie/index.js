import { connectionDefinitions } from 'graphql-relay';
import { toID } from '../../helpers';
import CursorKeyType from '../../objects/cursor-key';
import MetadataType from '../../objects/metadata';
import MovieType from '../../objects/movie';
import resolveMovie from '../../resolvers/movie';

const { connectionType: MovieConnection, edgeType: MovieEdge } = connectionDefinitions({
  name: 'Movie',
  nodeType: MovieType,
  resolveNode: ({ node }, args, context, info) => resolveMovie(node, args, context, info),
  resolveCursor: ({ cursorKey, node }) => (node ? toID(node[cursorKey], node.id) : null),
  edgeFields: { cursorKey: { type: CursorKeyType } },
  connectionFields: { _metadata: { type: MetadataType } },
});

export { MovieConnection, MovieEdge };
