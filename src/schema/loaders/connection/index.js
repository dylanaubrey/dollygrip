import { isFunction } from 'lodash';
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
   * @param {number} [opts.maxResultsChunk]
   * @param {number} [opts.resultsPerPage]
   * @return {ConnectionLoader}
   */
  constructor({ calcClosestMatch, cursorKey = 'id', maxResultsChunk = 50, resultsPerPage = 20 }) {
    // if (isFunction(calcClosestMatch)) {
    //   throw new Error('calcClosestMatch is a mandatory argument.');
    // }

    this._calcClosestMatch = calcClosestMatch;
    this._cursorKey = cursorKey;
    this._maxResultsChunk = maxResultsChunk;
    this._resultsPerPage = resultsPerPage;
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
   * @type {number}
   */
  _maxResultsChunk;

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
  _resultsPerPage;

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
        maxResultsChunk: this._maxResultsChunk,
        resultsPerPage: this._resultsPerPage,
      });

      this._resourceLoaders[key] = resourceLoader;
    }

    resourceLoader.setArguments(args);
    return resourceLoader;
  }
}
