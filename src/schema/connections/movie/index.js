import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import MovieConnection from '../../classes/movie-connection';
import { toID } from '../../helpers';
import CursorKeysType from '../../objects/cursorKeys';
import MetadataType from '../../objects/metadata';
import MovieType from '../../objects/movie';
import resolveMovie from '../../resolvers/movie';

const { connectionType: MovieConnectionType, edgeType: MovieEdgeType } = connectionDefinitions({
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

MovieConnectionType.isTypeOf = value => value instanceof MovieConnection;
export { MovieConnectionType, MovieEdgeType };
