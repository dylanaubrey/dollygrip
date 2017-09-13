/**
 *
 * @type {string}
 */
export const collection10Base = `
{
  collection(id: 10) {
    id
    name
    overview
    parts {
      id
      originalLanguage
      originalTitle
      releaseDate
      posterPath
      popularity
      title
      video
      voteAverage
      voteCount
    }
  }
}
`;

/**
 *
 * @type {string}
 */
export const collection10WithMovies = `
{
  collection(id: 10) {
    id
    name
    overview
    parts {
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
}
`;
