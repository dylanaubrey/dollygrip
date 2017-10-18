/* eslint-disable camelcase */

import { get } from 'lodash';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let connectionLoader;

/**
 *
 * @param {Object} result The result to check whether it is a closest match
 * @param {string} cursorKey The property name of the primary position identifier
 * @param {number} cursorValue The primary position identifier, i.e. rating value
 * @param {string} direction Is pagination going forward (after) or backward (before)
 * @param {Object} closest closest matching result
 * @return {boolean}
 */
const calcClosestMatch = function calcClosestMatch(
  result, cursorKey, cursorValue, direction, closest,
) {
  if (!closest) return true;

  if (direction === 'after') {
    return result[cursorKey] > cursorValue && result[cursorKey] < closest[cursorKey];
  }

  if (direction === 'before') {
    return result[cursorKey] < cursorValue && result[cursorKey] > closest[cursorKey];
  }

  return false;
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
    connectionLoader = new ConnectionLoader({
      calcClosestMatch,
      cursorKeys: {
        primary: { value: 'popularity', type: 'number' },
        secondary: { value: 'id', type: 'number' },
      },
    });
  }

  const resourceLoader = connectionLoader.getResourceLoader(resource, args);

  if (await resourceLoader.pagesRequested() === 0) {
    let res;

    try {
      res = await getta.getCompanyMovies({ resource });
    } catch (errors) {
      logger.error('dollygrip::resolveCompanyMovies', { errors });
    }

    await resourceLoader.setPageResults(
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
  } catch (errors) {
    logger.error('dollygrip::resolveCompanyMovies', { errors });
  }

  await Promise.all(
    res.map(value => resourceLoader.setPageResults(
      convertPropNames(get(value, ['data', '0'], {})),
      get(value, ['metadata', '0'], {}),
    )),
  );

  return resourceLoader.getData();
}
