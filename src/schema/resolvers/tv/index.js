import { get } from 'lodash';
import Tv from '../../classes/tv';
import { checkFieldData, resolveRestResponse } from '../../helpers';
import logger from '../../../logger';
import getta from '../../../rest-client';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Tv}
 */
export default async function resolveTv(obj, args, context, info) {
  if (checkFieldData(obj, info)) return new Tv(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getTv({ resource });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Tv);
};
