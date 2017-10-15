import { get, snakeCase } from 'lodash';
import Person from '../../classes/person';
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
 * @return {Person}
 */
export default async function resolvePerson(obj, args, context, info, { fragmentType } = {}) {
  const nameResolver = name => snakeCase(name);
  if (checkFieldData(obj, info, { fragmentType, nameResolver })) return new Person(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getPerson({ resource });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Person);
};
