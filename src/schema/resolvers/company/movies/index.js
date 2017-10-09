/* eslint-disable camelcase */

import { get } from 'lodash';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let connectionLoader;

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

  if (!connectionLoader) {
    connectionLoader = new ConnectionLoader({ calcClosestMatch, cursorKey: 'popularity' });
  }

  const resourceLoader = connectionLoader.getResourceLoader(resource, args);

  if (await resourceLoader.pagesRequested() === 0) {
    let res;

    try {
      res = await getta.getCompanyMovies({ resource });
    } catch (err) {
      logger.error(err);
    }

    resourceLoader.setPageResults(
      convertPropNames(get(res, ['data', '0'], {})),
      get(res, ['metadata', '0'], {}),
    );
  }

  const required = await resourceLoader.requiredPages();
  if (!required.length) return resourceLoader.getData();
  let res;

  try {
    res = await Promise.all(
      required.map(page => getta.getCompanyMovies({ queryParams: { page }, resource })),
    );
  } catch (err) {
    logger.error(err);
  }

  res.forEach((value) => {
    resourceLoader.setPageResults(
      convertPropNames(get(value, ['data', '0'], {})),
      get(value, ['metadata', '0'], {}),
    );
  });

  return resourceLoader.getData();
}
