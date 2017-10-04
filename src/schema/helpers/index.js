import { get, snakeCase } from 'lodash';

/**
 *
 * @param {Object} node
 * @return {Array<Object>}
 */
export const getChildFields = function getChildFields({ selectionSet } = {}) {
  return selectionSet ? selectionSet.selections : [];
};

/**
 *
 * @param {Object} info
 * @return {Array<any>}
 */
export const getFieldNodes = function getFieldNodes({ fieldNodes } = {}) {
  return fieldNodes || [];
};

/**
 *
 * @param {Object} info
 * @return {Array<Object>}
 */
export const getCurrentFieldNode = function getCurrentFieldNode(info = {}) {
  const fieldNodes = getFieldNodes(info);
  return fieldNodes[0];
};

/**
 *
 * @param {Object} node
 * @return {string}
 */
export const getName = function getName({ name }) {
  return name.value;
};

/**
 *
 * @param {Object} obj
 * @param {string} key
 * @return {boolean}
 */
export const hasFieldData = function hasFieldData(obj, key) {
  return obj[key] !== undefined;
};

/**
 *
 * @param {Object} obj
 * @param {Object} info
 * @return {boolean}
 */
export const checkFieldData = function fieldHasData(obj, info) {
  if (!obj) return false;
  const childFields = getChildFields(getCurrentFieldNode(info));

  for (let i = 0; i < childFields.length; i += 1) {
    const name = getName(childFields[i]);
    if (name !== '_metadata' && !hasFieldData(obj, snakeCase(name))) return false;
  }

  return true;
};

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @param {Function} resolver
 * @return {Array<Company>}
 */
export const resolveList = async function resolveList(obj, args, context, info, resolver) {
  const currentFieldNode = getCurrentFieldNode(info);
  const fieldData = obj[snakeCase(getName(currentFieldNode))];

  return Promise.all(
    fieldData.map(value => resolver(value, args, context, info)),
  );
};

/**
 *
 * @param {Object} res
 * @param {Object} data
 * @param {Class} SchemaClass
 * @return {Object}
 */
export const resolveRestResponse = function resolveRestResponse(res, data, SchemaClass) {
  if (!data) return null;
  const cacheControl = get(res, ['metadata', '0', 'cacheControl'], null);
  if (cacheControl) data._metadata = { cacheControl };
  return new SchemaClass(data);
};

/**
 *
 * @param {string} value
 * @return {string}
 */
export const base64 = function base64(value) {
  return new Buffer(value, 'utf8').toString('base64');
};

/**
 *
 * @param {string} value
 * @return {string}
 */
export const unbase64 = function unbase64(value) {
  return new Buffer(value, 'base64').toString('utf8');
};

/**
 *
 * @param {string} type
 * @param {string} subType
 * @return {string}
 */
export function toID(type, subType) {
  return base64(`${type}:${subType}`);
}

/**
 *
 * @param {string} id
 * @return {Object}
 */
export function fromID(id) {
  const types = unbase64(id).split(':');
  return { type: types[0], subType: types[1] };
}
