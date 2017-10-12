import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import { toID } from '../../helpers';
import CursorKeysType from '../../objects/cursorKeys';
import MetadataType from '../../objects/metadata';
import MovieType from '../../objects/movie';
import resolveMovie from '../../resolvers/movie';

const { connectionType: MovieConnection, edgeType: MovieEdge } = connectionDefinitions({
  name: 'Movie',
  nodeType: MovieType,
  resolveNode: ({ node }, args, context, info) => resolveMovie(node, args, context, info),
  resolveCursor: ({ cursorKeys, node }) => {
    if (!cursorKeys || !node) return null;
    const primaryCursorKey = cursorKeys.primary.value;
    const secondaryCursorKey = cursorKeys.secondary.value;
    return toID(node[primaryCursorKey], node[secondaryCursorKey]);
  },
  edgeFields: { cursorKeys: { type: CursorKeysType } },
  connectionFields: { totalResults: { type: GraphQLInt }, _metadata: { type: MetadataType } },
});

export { MovieConnection, MovieEdge };
