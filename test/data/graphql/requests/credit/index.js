/**
 *
 * @type {string}
 */
export const creditBase = `
  query ($id: Id!) {
    credit(id: $id) {
      character
      creditType
      department
      id
      job
      media {
        ... on Tv {
          name
        }
      }
      mediaType
    }
  }
`;

/**
 *
 * @type {string}
 */
export const creditWithExtraMedia = `
  query ($id: Id!) {
    credit(id: $id) {
      character
      creditType
      department
      id
      job
      media {
        name
        popularity
        voteAverage
        voteCount
      }
      mediaType
    }
  }
`;
