/**
 *
 * @type {string}
 */
export const collectionQueryOne = `
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
