import { get, snakeCase } from 'lodash';
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
  const nameResolver = name => snakeCase(name);
  if (checkFieldData(obj, info, { nameResolver })) return new Collection(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getCollection({ resource });
  } catch (errors) {
    logger.error('dollygrip::resolveCollection', { errors });
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Collection);
};
