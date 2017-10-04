import Resource from './resource';

/**
 *
 * Connection utility
 */
export default class ConnectionLoader {
  /**
   *
   * @constructor
   * @param {Object} opts
   * @param {number} opts.resultsChunk
   * @return {ConnectionLoader}
   */
  constructor({ resultsChunk = 20 }) {
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
  async hasAllResults() {
    return this._activeResource.hasAllPages();
  }

  /**
   *
   * @return {boolean}
   */
  noResults() {
    return this._activeResource.noResults();
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
   * @param {Function} resolveCursor
   * @return {void}
   */
  setResource(resource, args, resolveCursor) {
    if (!this._resources[resource]) {
      this._resources[resource] = new Resource({ resolveCursor, resultsChunk: this._resultsChunk });
    }

    this._activeResource = this._resources[resource];
    this._activeResource.setArguments(args);
  }
}
