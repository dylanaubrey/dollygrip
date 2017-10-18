import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import { toID } from '../../helpers';
import CursorKeysType from '../../objects/cursorKeys';
import MetadataType from '../../objects/metadata';
import TvType from '../../objects/tv';
import resolveTv from '../../resolvers/tv';

const { connectionType: TvConnection, edgeType: TvEdge } = connectionDefinitions({
  name: 'Tv',
  nodeType: TvType,
  resolveNode: ({ node }, args, context, info) => resolveTv(node, args, context, info),
  resolveCursor: ({ cursorKeys, node }) => {
    if (!cursorKeys || !node) return null;
    const primaryCursorKey = cursorKeys.primary.value;
    const secondaryCursorKey = cursorKeys.secondary.value;
    return toID(node[primaryCursorKey], node[secondaryCursorKey]);
  },
  edgeFields: { cursorKeys: { type: CursorKeysType } },
  connectionFields: { totalResults: { type: GraphQLInt }, _metadata: { type: MetadataType } },
});

export { TvConnection, TvEdge };
