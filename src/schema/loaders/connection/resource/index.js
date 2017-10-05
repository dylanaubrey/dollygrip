/* eslint-disable camelcase */

import Cachemap from 'cachemap';
import { fromID, toID } from '../../../helpers';

/**
 *
 * Connection resource utility
 */
export default class ConnectionResource {
  /**
   *
   * @constructor
   * @param {Object} opts
   * @param {Function} opts.calcFuzzyMatch
   * @param {string} opts.cursorKey
   * @param {number} opts.resultsChunk
   * @return {ConnectionResource}
   */
  constructor({ calcFuzzyMatch, cursorKey, resultsChunk }) {
    this._calcFuzzyMatch = calcFuzzyMatch;
    this._cursorKey = cursorKey;
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
  _resultsChunk;

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
   * @param {string} cursor
   * @param {Array<Object>} results
   * @param {string} direction
   * @return {number}
   */
  async _calcCursorPosition(cursor, results, direction) {
    const { type, subType } = fromID(cursor);
    const matches = { exact: [], fuzzy: [] };

    results.forEach((value, index) => {
      if (value[this._cursorKey] === type) {
        matches.exact.push({ value, index });
      } else if (this._calcFuzzyMatch(value, this._cursorKey, type, direction, matches.fuzzy)) {
        matches.fuzzy.push({ value, index });
      }
    });

    let position;

    if (matches.exact.length === 1) {
      position = matches.exact.index;
    } else if (matches.exact.length > 1) {
      const match = matches.exact.find(value => value.id === subType);
      position = match.length ? match.index : matches[0].index;
    } else {
      position = matches.fuzzy[0].index;
    }

    return position;
  }

  /**
   *
   * @private
   * @param {Array<Object>} results
   * @return {Object}
   */
  async _calcPagination(results) {
    let count, pagination;

    if (this._activeArgs.first) {
      count = this._activeArgs.first < this._resultsChunk
        ? this._activeArgs.first : this._resultsChunk;

      pagination = { count, start: 0 };
    } else if (this._activeArgs.last) {
      count = this._activeArgs.last < this._resultsChunk
        ? this._activeArgs.last : this._resultsChunk;

      pagination = { count, start: results.length - (count + 1) };
    } else if (this._activeArgs.after) {
      pagination = {
        count: this._resultsChunk,
        start: await this._calcCursorPosition(this._activeArgs.after, results, 'after'),
      };
    } else if (this._activeArgs.before) {
      pagination = {
        count: this._resultsChunk,
        start: await this._calcCursorPosition(this._activeArgs.before, results, 'before'),
      };
    }

    return pagination;
  }

  /**
   *
   * @private
   * @return {void}
   */
  async _collateData() {
    let results = [];
    const cacheabilities = [];

    await this._pages.forEach((value, key, cacheability) => {
      if (!value) return;
      results[key] = value;
      cacheabilities.push(cacheability);
    });

    const cacheability = this._reduceCacheabilities(cacheabilities);

    if (this.hasNoPages) {
      return {
        edges: [],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
        _metadata: { cacheControl: cacheability.printCacheControl() },
      };
    }

    results = [].concat(...results);
    const { count, start } = await this._calcPagination(results);
    const range = results.slice(start, start + count);

    return {
      edges: await this._getEdgesData(range),
      pageInfo: await this._getPageInfoData(results, range, start, count),
      _metadata: { cacheControl: cacheability.printCacheControl() },
    };
  }

  /**
   *
   * @private
   * @param {Array<Object>} range
   * @return {Array<Object>}
   */
  async _getEdgesData(range) {
    const edges = [];

    range.forEach((value) => {
      edges.push({ cursorKey: this._cursorKey, node: value });
    });

    return edges;
  }

  /**
   *
   * @private
   * @param {Array<Object>} results
   * @param {Array<Object>} range
   * @param {number} start
   * @param {number} count
   * @return {Array<Object>}
   */
  async _getPageInfoData(results, range, start, count) {
    const endIndex = range.length - 1;

    return {
      hasNextPage: (results.length - 1) > (start + count),
      hasPreviousPage: start > 0,
      startCursor: toID(range[0][this._cursorKey], range[0].id),
      endCursor: toID(range[endIndex][this._cursorKey], range[endIndex].id),
    };
  }

  /**
   *
   * @private
   * @param {Array<Cacheability>} cacheabilities
   * @return {Cacheability}
   */
  _reduceCacheabilities(cacheabilities) {
    let cacheability;

    cacheabilities.forEach((value) => {
      if (!cacheability || cacheability.metadata.ttl > value.metadata.ttl) cacheability = value;
    });

    return cacheability;
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
    return this._collateData();
  }

  /**
   *
   * @return {boolean}
   */
  async hasAllPages() {
    return await this._pages.size() === this._totalPages;
  }

  /**
   *
   * @return {boolean}
   */
  noPages() {
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
  setArguments(opts) {
    this._activeArgs = opts;
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
  }
}
