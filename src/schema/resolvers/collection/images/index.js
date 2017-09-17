import { get } from 'lodash';
import MediaImages from '../../../classes/media-images';
import getta from '../../../../rest-client';
import logger from '../../../../logger';

/**
 *
 * @param {Object} obj
 * @return {MediaImages}
 */
export default async function resolveCollectionImages(obj) {
  let res;

  try {
    res = await getta.getCollectionImages({ resource: obj.id });
  } catch (err) {
    logger.error(err);
  }

  const data = get(res, ['data', '0'], null);
  if (!data) return null;
  const cacheControl = get(res, ['metadata', '0', 'cacheControl'], null);
  if (cacheControl) data._metadata = { cacheControl };
  return new MediaImages(data);
};
