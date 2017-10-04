/* eslint-disable camelcase */

import { get } from 'lodash';
import { toID } from '../../../helpers';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let loader;

/**
 *
 * @param {number} id
 * @param {number} page
 * @param {Array<Object>} results
 * @param {number} total_pages
 * @param {number} total_results
 * @return {Object}
 */
const convertPropNames = function convertPropNames(id, page, results, total_pages, total_results) {
  return { id, page, results, totalPages: total_pages, totalResults: total_results };
};

/**
 *
 * @param {Object} obj
 * @return {number}
 */
const resolveCursor = function resolveCursor(obj) {
  return toID(obj.popularity, obj.id);
};

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {Object}
 */
export default async function resolveCompanyMovies(obj, args) {
  const resource = obj.id;
  if (!loader) loader = new ConnectionLoader();
  loader.setResource(resource, args, resolveCursor);

  if (await loader.cachesValid()) {
    if (loader.noResults()) return loader.getData();
    if (await loader.hasAllResults()) return loader.getData();
  }

  // let res;

  // try {
  //   res = await getta.getCompanyMovies({ resource });
  // } catch (err) {
  //   logger.error(err);
  // }

  // const data = convertPropNames(get(res, ['data', '0'], {}));
  // const metadata = get(res, ['data', '0'], {});
  // loader.setPageResults(data, metadata);
  // TODO
}
