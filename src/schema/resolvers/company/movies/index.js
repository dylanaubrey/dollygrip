/* eslint-disable camelcase */

import { get } from 'lodash';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let loader;

/**
 *
 * @param {Object} result
 * @param {string} cursorKey
 * @param {number} type
 * @param {string} direction
 * @param {Array<Object>} closest
 * @return {boolean}
 */
const calcClosestMatch = function calcClosestMatch(result, cursorKey, type, direction, closest) {
  // TODO
};

/**
 *
 * @param {Object} args
 * @param {number} args.id
 * @param {number} args.page
 * @param {Array<Object>} args.results
 * @param {number} args.total_pages
 * @param {number} args.total_results
 * @return {Object}
 */
const convertPropNames = function convertPropNames({
  id, page, results, total_pages, total_results,
}) {
  return { id, page, results, totalPages: total_pages, totalResults: total_results };
};

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {Object}
 */
export default async function resolveCompanyMovies(obj, args) {
  const resource = obj.id;
  if (!loader) loader = new ConnectionLoader({ calcClosestMatch, cursorKey: 'popularity' });
  loader.setResource(resource, args);

  if (await loader.pagesRequested() === 0) {
    let res;

    try {
      res = await getta.getCompanyMovies({ resource });
    } catch (err) {
      logger.error(err);
    }

    loader.setPageResults(
      convertPropNames(get(res, ['data', '0'], {})),
      get(res, ['metadata', '0'], {}),
    );
  }

  const required = await loader.requiredPages();
  if (!required.length) return loader.getData();
  let res;

  try {
    res = await Promise.all(
      required.map(page => getta.getCompanyMovies({ queryParams: { page }, resource })),
    );
  } catch (err) {
    logger.error(err);
  }

  res.forEach((value) => {
    loader.setPageResults(
      convertPropNames(get(value, ['data', '0'], {})),
      get(value, ['metadata', '0'], {}),
    );
  });

  return loader.getData();
}
