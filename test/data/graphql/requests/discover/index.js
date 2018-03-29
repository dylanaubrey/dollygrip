/**
 *
 * @type {string}
 */
export const discoverBase = `
  query (
    $connection: ConnectionInputType,
    $cursor: CursorInputType,
    $media: String!,
    $movie: DiscoverMovieInputType,
    $tv: DiscoverTvInputType
  ) {
    discover(connection: $connection, cursor: $cursor, media: $media, movie: $movie, tv: $tv) {
      edges {
        cursor
        node {
          ... on Movie {
            title
          }
          ... on Tv {
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalResults
    }
  }
`;
