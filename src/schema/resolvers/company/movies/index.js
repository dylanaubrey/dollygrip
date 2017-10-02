import { get } from 'lodash';
import resolveConnection from '../../connection';
import Pagination from '../../../helpers/pagination';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {string} args.after
 * @param {string} args.before
 * @param {number} args.first
 * @param {number} args.last
 * @return {Object}
 */
export default async function resolveCompanyMovies(obj, { after, before, first, last }) {
  const resource = obj.id;
  let res;

  try {
    res = await getta.getCompanyMovies({ resource });
  } catch (err) {
    logger.error(err);
  }

  const { page, results = [], total_pages, total_results } = get(res, ['data', '0'], {});
  const pagination = new Pagination(page, total_pages, total_results);

  if (first && first <= pagination.firstPage().length) {
    return resolveConnection(results, pagination);
  }

  if (last && last <= pagination.lastPage().length) {
    const queryParams = { page: pagination.totalPages };

    try {
      res = await getta.getCompanyMovies({ queryParams, resource });
    } catch (err) {
      logger.error(err);
    }

    const { page, results = [], total_pages, total_results } = get(res, ['data', '0'], {});
    // TODO
    return resolveConnection(results, page, total_pages, total_results);
  }

  // TODO
}
