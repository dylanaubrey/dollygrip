import { get } from 'lodash';
import Company from '../../classes/company';
import { checkFieldData, resolveRestResponse } from '../../helpers';
import getta from '../../../rest-client';
import logger from '../../../logger';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Company}
 */
export default async function resolveCompany(obj, args, context, info) {
  if (checkFieldData(obj, info)) return new Company(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getCompany({ resource });
  } catch (err) {
    logger.error(err);
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Company);
};
