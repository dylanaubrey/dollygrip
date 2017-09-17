import { get } from 'lodash';
import Collection from '../../classes/collection';
import { checkFieldData, resolveRestResponse } from '../../helpers';
import getta from '../../../rest-client';
import logger from '../../../logger';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Colleciton}
 */
export default async function resolveCollection(obj, args, context, info) {
  if (checkFieldData(obj, info)) return new Collection(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getCollection({ resource });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Collection);
};
