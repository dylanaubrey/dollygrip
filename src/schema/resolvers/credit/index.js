import { get } from 'lodash';
import Credit from '../../classes/credit';
import { resolveRestResponse } from '../../helpers';
import getta from '../../../rest-client';
import logger from '../../../logger';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {Credit}
 */
export default async function resolveCredit(obj, args) {
  let res;

  try {
    res = await getta.getCompany({ resource: args.id });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Credit);
};
