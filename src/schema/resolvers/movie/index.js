import { get, snakeCase } from 'lodash';
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
 * @param {Object} [opts]
 * @param {string} [opts.fragmentType]
 * @return {Movie}
 */
export default async function resolveMovie(obj, args, context, info, { fragmentType } = {}) {
  const nameResolver = name => snakeCase(name);
  if (checkFieldData(obj, info, { fragmentType, nameResolver })) return new Movie(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getMovie({ resource });
  } catch (errors) {
    logger.error('dollygrip::resolveMovie', { errors });
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Movie);
};
