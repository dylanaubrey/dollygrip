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
export const company1BaseWithMovies = `
{
  company(id: 1) {
    description
    headquarters
    homepage
    id
    logoPath
    movies(first: 1) {
      edges {
        node {
          title
        }
      }
    }
    name
    parentCompany
  }
}
`;
