import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import { toID } from '../../helpers';
import CursorKeysType from '../../objects/cursorKeys';
import MetadataType from '../../objects/metadata';
import MediaType from '../../unions/media';
import resolveMedia from '../../resolvers/media';

const {
  connectionType: DiscoverConnectionType,
  edgeType: DiscoverEdgeType,
} = connectionDefinitions({
  name: 'Discover',
  nodeType: MediaType,
  resolveNode: ({ mediaType, node }, args, context, info) => resolveMedia(
    node, args, context, info, mediaType,
  ),
  resolveCursor: ({ cursorKeys, node }) => {
    if (!cursorKeys || !node) return null;
    const primaryCursorKey = cursorKeys.primary.value;
    const secondaryCursorKey = cursorKeys.secondary.value;
    return toID(node[primaryCursorKey], node[secondaryCursorKey]);
  },
  edgeFields: {
    cursorKeys: { type: CursorKeysType },
    mediaType: { type: new GraphQLNonNull(GraphQLString) },
  },
  connectionFields: {
    totalResults: { type: GraphQLInt },
    _metadata: { type: MetadataType },
  },
});

export { DiscoverConnectionType, DiscoverEdgeType };
