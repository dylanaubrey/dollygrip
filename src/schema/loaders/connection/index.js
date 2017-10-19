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
   * @param {Function} [opts.calcClosestMatch]
   * @param {number} [opts.maxResultsChunk]
   * @param {number} [opts.resultsPerPage]
   * @return {ConnectionLoader}
   */
  constructor({ calcClosestMatch, maxResultsChunk = 50, resultsPerPage = 20 } = {}) {
    if (calcClosestMatch) this._calcClosestMatch = calcClosestMatch;
    this._maxResultsChunk = maxResultsChunk;
    this._resultsPerPage = resultsPerPage;
  }

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
   * @param {Object} result The result to check whether it is a closest match
   * @param {string} cursorKey The property name of the primary position identifier
   * @param {number} cursorValue The primary position identifier, i.e. rating value
   * @param {string} direction Is pagination going forward (after) or backward (before)
   * @param {Object} closest closest matching result
   * @return {boolean}
   */
  _calcClosestMatch(result, cursorKey, cursorValue, direction, closest) {
    if (!closest) return true;

    if (direction === 'after') {
      return result[cursorKey] > cursorValue && result[cursorKey] < closest[cursorKey];
    }

    if (direction === 'before') {
      return result[cursorKey] < cursorValue && result[cursorKey] > closest[cursorKey];
    }

    return false;
  }

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
        maxResultsChunk: this._maxResultsChunk,
        resultsPerPage: this._resultsPerPage,
      });

      this._resourceLoaders[key] = resourceLoader;
    }

    resourceLoader.setArguments(args);
    return resourceLoader;
  }
}
