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
export const getKind = function getKind({ kind }) {
  return kind;
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
 * @param {Object} inlineFragmentNode
 * @return {Object}
 */
export const getTypeCondition = function getTypeCondition({ typeCondition }) {
  return typeCondition;
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
 * @param {Object} opts
 * @param {string} opts.fragmentType
 * @param {Function} opts.nameResolver
 * @return {boolean}
 */
export const checkFieldData = function checkFieldData(
  obj, info, { fragmentType, nameResolver = name => name } = {},
) {
  /**
   *
   * @param {Array<Object>} fields
   * @return {boolean}
   */
  const checkChildFieldData = function checkChildFieldData(fields) {
    for (let i = 0; i < fields.length; i += 1) {
      const kind = getKind(fields[i]);

      if (kind === 'InlineFragment') {
        if (!fragmentType || fragmentType === getName(getTypeCondition(fields[i]))) {
          const output = checkChildFieldData(getChildFields(fields[i]));
          if (!output) return false;
        }
      } else if (kind === 'Field') {
        const name = getName(fields[i]);
        if (name !== '_metadata' && !hasFieldData(obj, nameResolver(name))) return false;
      }
    }

    return true;
  };

  if (!obj) return false;
  return checkChildFieldData(getChildFields(getCurrentFieldNode(info)));
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
export const resolveObject = async function resolveObject(obj, args, context, info, resolver) {
  const currentFieldNode = getCurrentFieldNode(info);
  const fieldData = obj[snakeCase(getName(currentFieldNode))];
  return resolver(fieldData, args, context, info);
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
 * @param {string|number} primary
 * @param {string|number} secondary
 * @return {string}
 */
export function toID(primary, secondary) {
  return base64(`${primary}:${secondary}`);
}

/**
 *
 * @param {string} id
 * @param {Object} cursorKeys
 * @param {Object} cursorKeys.primary
 * @param {Object} cursorKeys.secondary
 * @return {Object}
 */
export function fromID(id, { primary, secondary }) {
  const cursors = unbase64(id).split(':');
  const primaryCursorValue = primary.type === 'number' ? Number(cursors[0]) : cursors[0];
  const secondaryCursorValue = secondary.type === 'number' ? Number(cursors[1]) : cursors[1];
  return { primaryCursorValue, secondaryCursorValue };
}
