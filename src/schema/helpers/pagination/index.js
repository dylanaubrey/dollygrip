// TODO: This needs to be turned into a class.

/**
 *
 * @param {number} totalPages
 * @param {number} totalResults
 * @return {Array<number>}
 */
export default function getPagination(totalPages, totalResults) {
  const resultsPerPage = 20;
  const pagination = [];
  let resultsRemaining = totalResults;

  do {
    const amount = resultsRemaining > resultsPerPage ? resultsPerPage : resultsRemaining;
    pagination.push(amount);
    resultsRemaining -= resultsPerPage;
  } while (pagination.length < totalPages);

  return pagination;
}
