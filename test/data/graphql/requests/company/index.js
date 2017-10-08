/**
 *
 * @type {string}
 */
export const company1Base = `
  {
    company(id: 1) {
      description
      headquarters
      homepage
      id
      logoPath
      name
      parentCompany
    }
  }
`;

/**
 *
 * @type {string}
 */
export const company1WithMovies = `
  {
    company(id: 1) {
      description
      headquarters
      homepage
      id
      logoPath
      movies(first: 6) {
        edges {
          cursor
          node {
            title
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
      name
      parentCompany
    }
  }
`;

/**
 *
 * @type {string}
 */
export const company1WithMoviesExtra = `
  {
    company(id: 1) {
      description
      headquarters
      homepage
      id
      logoPath
      movies(first: 6) {
        edges {
          cursor
          node {
            id
            originalLanguage
            originalTitle
            releaseDate
            posterPath
            popularity
            productionCountries {
              iso31661
              name
            }
            spokenLanguages {
              iso6391
              name
            }
            title
            video
            voteAverage
            voteCount
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
      name
      parentCompany
    }
  }
`;

/**
 *
 * @type {string}
 */
export const company1WithNextMovies = `
  {
    query ($id: Int!, $after: String!) {
      company(id: $id) {
        description
        headquarters
        homepage
        id
        logoPath
        movies(first: $after) {
          edges {
            cursor
            node {
              id
              originalLanguage
              originalTitle
              releaseDate
              posterPath
              popularity
              productionCountries {
                iso31661
                name
              }
              spokenLanguages {
                iso6391
                name
              }
              title
              video
              voteAverage
              voteCount
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
        name
        parentCompany
      }
    }
  }
`;
