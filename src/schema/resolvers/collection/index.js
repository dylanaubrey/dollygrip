import { get } from 'lodash';
import Collection from '../../classes/collection';
import getta from '../../../rest-client';
import logger from '../../../logger';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {Colleciton}
 */
export default async function resolveCollection(obj, args) {
  let res;

  try {
    res = await getta.getCollection({ resource: args.id });
  } catch (err) {
    logger.error(err);
  }

  const data = get(res, ['data', '0'], null);
  if (!data) return null;
  const cacheControl = get(res, ['metadata', '0', 'cacheControl'], null);
  if (cacheControl) data._metadata = { cacheControl };
  return new Collection(data);
}