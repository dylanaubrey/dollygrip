import { snakeCase } from 'lodash';
import { getCurrentFieldNode, getName } from '../helpers';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {any}
 */
export default function defaultResolver(obj, args, context, info) {
  const currentField = getCurrentFieldNode(info);
  const name = getName(currentField);
  if (({}).hasOwnProperty.call(obj, name)) return obj[name];
  return obj[snakeCase(name)];
}
