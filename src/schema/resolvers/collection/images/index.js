import { get } from 'lodash';
import MediaImages from '../../../classes/media-images';
import { resolveRestResponse } from '../../../helpers';
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

  return resolveRestResponse(res, get(res, ['data', '0'], null), MediaImages);
};
