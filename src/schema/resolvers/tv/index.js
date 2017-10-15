import { get, snakeCase } from 'lodash';
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
 * @param {Object} [opts]
 * @param {string} [opts.fragmentType]
 * @return {Tv}
 */
export default async function resolveTv(obj, args, context, info, { fragmentType } = {}) {
  const nameResolver = name => snakeCase(name);
  if (checkFieldData(obj, info, { fragmentType, nameResolver })) return new Tv(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getTv({ resource });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Tv);
};
