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
