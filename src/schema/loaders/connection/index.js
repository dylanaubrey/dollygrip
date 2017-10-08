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
   * @type {Object}
   */
  _activeResource;

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
  async requiredPages() {
    return this._activeResource.requiredPages();
  }

  /**
   *
   * @return {number}
   */
  async pagesRequested() {
    return this._activeResource.pagesRequested();
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
   * @param {number} key
   * @param {Object} args
   * @return {void}
   */
  setResource(key, args) {
    let resource = this._resources[key];

    if (!resource) {
      resource = new Resource({
        calcClosestMatch: this._calcClosestMatch,
        cursorKey: this._cursorKey,
        resultsChunk: this._resultsChunk,
      });

      this._resources[key] = resource;
    }

    this._activeResource = resource;
    this._activeResource.setArguments(args);
  }
}
