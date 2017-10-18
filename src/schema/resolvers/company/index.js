import { get, snakeCase } from 'lodash';
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
  const nameResolver = name => snakeCase(name);
  if (checkFieldData(obj, info, { nameResolver })) return new Company(obj);
  const resource = obj ? obj.id : args.id;
  let res;

  try {
    res = await getta.getCompany({ resource });
  } catch (errors) {
    logger.error('dollygrip::resolveCompany', { errors });
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Company);
};
