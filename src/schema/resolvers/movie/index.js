import { get } from 'lodash';
import Movie from '../../classes/movie';
import { checkFieldData, resolveRestResponse } from '../../helpers';
import logger from '../../../logger';
import getta from '../../../rest-client';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Movie}
 */
export default async function resolveMovie(obj, args, context, info) {
  if (checkFieldData(obj, info)) return new Movie(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getMovie({ resource });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Movie);
};
