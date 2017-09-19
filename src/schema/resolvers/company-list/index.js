import resolveCompany from '../company';
import { resolveList } from '../../helpers';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Array<Company>}
 */
export default async function resolveCompanyList(obj, args, context, info) {
  return resolveList(obj, args, context, info, resolveCompany);
};
