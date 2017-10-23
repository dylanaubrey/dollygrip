/**
 *
 * @type {string}
 */
export const discoverBase = `
  query (
    $media: String!,
    $connection: ConnectionInputType,
    $movie: DiscoverMovieInputType,
    $tv: DiscoverTvInputType
  ) {
    discover(media: $media, connection: $connection, movie: $movie, tv: $tv) {
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
