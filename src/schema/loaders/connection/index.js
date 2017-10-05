import Resource from './resource';

/**
 *
 * Connection utility
 */
export default class ConnectionLoader {
  /**
   *
   * @constructor
   * @param {Object} [opts]
   * @param {Function} opts.calcFuzzyMatch
   * @param {string} [opts.cursorKey]
   * @param {number} [opts.resultsChunk]
   * @return {ConnectionLoader}
   */
  constructor({ calcFuzzyMatch, cursorKey = 'id', resultsChunk = 20 }) {
    this._calcFuzzyMatch = calcFuzzyMatch;
    this._cursorKey = cursorKey;
    this._resultsChunk = resultsChunk;
  }

  /**
   *
   * @private
   * @type {Object}
   */
  _activeResource;

  /**
   *
   * @private
   * @type {Function}
   */
  _calcFuzzyMatch;

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
  _resources = {};

  /**
   *
   * @private
   * @type {number}
   */
  _resultsChunk;

  /**
   *
   * @return {Object}
   */
  async getData() {
    return this._activeResource.getData();
  }

  /**
   *
   * @return {boolean}
   */
  async hasAllPages() {
    return this._activeResource.hasAllPages();
  }

  /**
   *
   * @return {boolean}
   */
  noPages() {
    return this._activeResource.noPages();
  }

  /**
   *
   * @param {Object} data
   * @param {Object} metadata
   * @return {void}
   */
  setPageResults(data, metadata) {
    this._activeResource.setPageResults(data, metadata);
  }

  /**
   *
   * @param {number} resource
   * @param {Object} args
   * @return {void}
   */
  setResource(resource, args) {
    if (!this._resources[resource]) {
      this._resources[resource] = new Resource({
        calcFuzzyMatch: this._calcFuzzyMatch,
        cursorKey: this._cursorKey,
        resultsChunk: this._resultsChunk,
      });
    }

    this._activeResource = this._resources[resource];
    this._activeResource.setArguments(args);
  }
}
