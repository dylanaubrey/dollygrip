import ConnectionResourceLoader from './resource';

/**
 *
 * Connection utility
 */
export default class ConnectionLoader {
  /**
   *
   * @constructor
   * @param {Object} [opts]
   * @param {Function} opts.calcClosestMatch
   * @param {string} [opts.cursorKey]
   * @param {number} [opts.resultsChunk]
   * @return {ConnectionLoader}
   */
  constructor({ calcClosestMatch, cursorKey = 'id', resultsChunk = 20 }) {
    this._calcClosestMatch = calcClosestMatch;
    this._cursorKey = cursorKey;
    this._resultsChunk = resultsChunk;
  }

  /**
   *
   * @private
   * @type {Function}
   */
  _calcClosestMatch;

  /**
   *
   * @private
   * @type {string}
   */
  _cursorKey;

  /**
   *
   * @private
   * @type {Object}
   */
  _resourceLoaders = {};

  /**
   *
   * @private
   * @type {number}
   */
  _resultsChunk;

  /**
   *
   * @param {number} key
   * @param {Object} args
   * @return {ConnectionResourceLoader}
   */
  getResourceLoader(key, args) {
    let resourceLoader = this._resourceLoaders[key];

    if (!resourceLoader) {
      resourceLoader = new ConnectionResourceLoader({
        calcClosestMatch: this._calcClosestMatch,
        cursorKey: this._cursorKey,
        resultsChunk: this._resultsChunk,
      });

      this._resourceLoaders[key] = resourceLoader;
    }

    resourceLoader.setArguments(args);
    return resourceLoader;
  }
}
