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
        ... on Movie {
          title
        }
        ... on Tv {
          name
        }
      }
      mediaType
      person {
        name
      }
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
        ... on Movie {
          title
        }
        ... on Tv {
          name
          popularity
          voteAverage
          voteCount
        }
      }
      mediaType
      person {
        name
      }
    }
  }
`;

/**
 *
 * @type {string}
 */
export const creditWithExtraPerson = `
  query ($id: Id!) {
    credit(id: $id) {
      character
      creditType
      department
      id
      job
      media {
        ... on Movie {
          title
        }
        ... on Tv {
          name
        }
      }
      mediaType
      person {
        biography
        birthday
        gender
        name
        popularity
      }
    }
  }
`;
