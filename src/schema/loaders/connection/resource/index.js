/* eslint-disable camelcase */

import Cachemap from 'cachemap';

/**
 *
 * Connection resource utility
 */
export default class ConnectionResource {
  /**
   *
   * @constructor
   * @param {Object} opts
   * @param {Function} opts.resolveCursor
   * @param {number} opts.resultsChunk
   * @return {ConnectionResource}
   */
  constructor({ resolveCursor, resultsChunk }) {
    this._resolveCursor = resolveCursor;
    this._resultsChunk = resultsChunk;
  }

  /**
   *
   * @private
   * @type {Object}
   */
  _activeArgs;

  /**
   *
   * @private
   * @type {Object}
   */
  _data = {};

  /**
   *
   * @private
   * @type {Cachemap}
   */
  _pages = new Cachemap({ storageType: 'map' });

  /**
   *
   * @private
   * @type {Array<number>}
   */
  _pagination = [];

  /**
   *
   * @private
   * @type {number}
   */
  _totalPages;

  /**
   *
   * @private
   * @type {number}
   */
  _totalResults;

  /**
   *
   * @private
   * @return {void}
   */
  _buildPagination() {
    if (!this._totalResults || !this._totalPages) return;
    let resultsRemaining = this._totalResults;
    this._pagination = [];

    do {
      const amount = resultsRemaining > this._resultsChunk
        ? this._resultsChunk : resultsRemaining;

      this._pagination.push(amount);
      resultsRemaining -= this._resultsChunk;
    } while (this._pagination.length < this._totalPages);
  }

  /**
   *
   * @return {void}
   */
  async _collateData() {
    // TODO
  }

  /**
   *
   * @private
   * @param {Object} data
   * @return {Array<Object>}
   */
  async _getEdgesData(data) {
    // TODO
  }

  /**
   *
   * @private
   * @param {Object} data
   * @return {Object}
   */
  async _getPageInfoData(data) {
    // TODO
  }

  /**
   *
   * @return {boolean}
   */
  async cachesValid() {
    let valid = true;

    await this._pages.forEach((value, key, cacheability) => {
      if (!cacheability.checkTTL()) valid = false;
    });

    return valid;
  }

  /**
   *
   * @return {Object}
   */
  async getData() {
    const data = await this._collateData();

    return {
      edges: await this._getEdgesData(data),
      pageInfo: await this._getPageInfoData(data),
    };
  }

  /**
   *
   * @return {boolean}
   */
  async hasAllResults() {
    return await this._pages.size() === this._totalPages;
  }

  /**
   *
   * @return {boolean}
   */
  noResults() {
    return this._totalPages === 0;
  }

  /**
   *
   * @param {Object} opts
   * @param {string} opts.after
   * @param {string} opts.before
   * @param {number} opts.first
   * @param {number} opts.last
   * @return {void}
   */
  setArguments({ after, before, first, last }) {
    this._activeArgs = { after, before, first, last };
  }

  /**
   *
   * @private
   * @param {Object} data
   * @param {number} data.page
   * @param {Array<any>} data.results
   * @param {number} data.totalPages
   * @param {number} data.totalResults
   * @param {Object} metadata
   * @param {string} metadata.cacheControl
   * @return {void}
   */
  setPageResults({ page, results = [], totalPages = 0, totalResults = 0 }, { cacheControl }) {
    this._pages.set(page, results, { cacheControl });
    this._totalPages = totalPages;
    this._totalResults = totalResults;
    this._buildPagination();
  }
}
