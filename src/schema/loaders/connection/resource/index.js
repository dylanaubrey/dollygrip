/* eslint-disable camelcase */

import Cacheability from 'cacheability';
import Cachemap from 'cachemap';
import { fromID, toID } from '../../../helpers';

/**
 *
 * Connection resource utility
 */
export default class ConnectionResourceLoader {
  /**
   *
   * @constructor
   * @param {Object} opts
   * @param {Function} opts.calcClosestMatch
   * @param {string} opts.cursorKey
   * @param {number} opts.maxResultsChunk
   * @param {number} opts.resultsPerPage
   * @return {ConnectionResourceLoader}
   */
  constructor({ calcClosestMatch, cursorKey, maxResultsChunk, resultsPerPage }) {
    this._calcClosestMatch = calcClosestMatch;
    this._cursorKey = cursorKey;
    this._maxResultsChunk = maxResultsChunk;
    this._resultsPerPage = resultsPerPage;
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
   * @type {Cacheability}
   */
  _cacheability;

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
  _data = {};

  /**
   *
   * @private
   * @type {number}
   */
  _maxResultsChunk;

  /**
   *
   * @private
   * @type {Map}
   */
  _pageRanges;

  /**
   *
   * @private
   * @type {Cachemap}
   */
  _pages = new Cachemap({ storageType: 'map' });

  /**
   *
   * @private
   * @type {Object}
   */
  _pagination;

  /**
   *
   * @private
   * @type {Array<Object>}
   */
  _getResults;

  /**
   *
   * @private
   * @type {number}
   */
  _resultsPerPage;

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
  _buildPageRanges() {
    const pageRanges = new Map();
    let resultsPaginated = 0;
    let pageNumber = 1;

    do {
      const range = { start: resultsPaginated };

      if ((range.start + this._resultsPerPage) < this._totalResults) {
        range.end = range.start + this._resultsPerPage;
        resultsPaginated += this._resultsPerPage;
      } else {
        range.end = this._totalResults;
        resultsPaginated = this._totalResults;
      }

      pageRanges.set(pageNumber, range);
      pageNumber += 1;
    } while (pageNumber < this._totalPages);

    this._pageRanges = pageRanges;
  }

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
    const exact = [];
    let closest;

    results.forEach((result, index) => {
      if (result[this._cursorKey] === type) {
        exact.push({ result, index });
      } else if (this._calcClosestMatch(result, this._cursorKey, type, direction, closest)) {
        closest = { result, index };
      }
    });

    let position;

    if (exact.length === 1) {
      position = exact[0].index;
    } else if (exact.length > 1) {
      const match = exact.find(value => value.result.id === subType);
      position = match ? match.index : exact[0].index;
    } else if (closest) {
      position = closest.index;
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
    if (this._pagination) return this._pagination;
    let count, pagination, start;

    if (this._activeArgs.first) {
      count = this._activeArgs.first < this._maxResultsChunk
        ? this._activeArgs.first : this._maxResultsChunk;

      start = this._activeArgs.after
        ? this._calcCursorPosition(this._activeArgs.after, results, 'after') : 0;

      pagination = { count, start };
    } else if (this._activeArgs.last) {
      count = this._activeArgs.last < this._maxResultsChunk
        ? this._activeArgs.last : this._maxResultsChunk;

      start = this._activeArgs.before
        ? this._calcCursorPosition(this._activeArgs.before, results, 'before')
        : this._totalResults - (count + 1);

      pagination = { count, start };
    }

    this._pagination = pagination;
    return this._pagination;
  }

  /**
   *
   * @private
   * @return {void}
   */
  async _collateData() {
    if (this._noPages()) {
      return {
        edges: [],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
        _metadata: { cacheControl: this._cacheability.printCacheControl() },
      };
    }

    const results = await this._getResults();
    const { count, start } = await this._calcPagination(results);
    const range = results.slice(start, start + count);

    return {
      edges: await this._getEdgesData(range),
      pageInfo: await this._getPageInfoData(results, range, start, count),
      totalResults: this._totalResults,
      _metadata: { cacheControl: this._cacheability.printCacheControl() },
    };
  }

  /**
   *
   * @private
   * @return {Array<Object>}
   */
  async _getResults() {
    if (this._results) return this._results;
    const results = [];

    await this._pages.forEach((value, key) => {
      results[key] = value;
    });

    this._results = [].concat(...results.filter(value => !!value));
    return this._results;
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
   * @return {Array<number>}
   */
  async _getRequiredPageNumbers() {
    const results = await this._getResults();
    const { count, start } = await this._calcPagination(results);
    const end = start + count;
    const pageRange = [];

    this._pageRanges.forEach((value, key) => {
      const { end: rangeEnd, start: rangeStart } = value;

      if (start > rangeStart && start < rangeEnd) {
        pageRange.push(key);
      } else if (end > rangeStart) {
        pageRange.push(key);
      }
    });

    const pageNumbers = [];

    await Promise.all(
      pageRange.map((pageNumber) => {
        const promise = this._pages.has(pageNumber);

        promise.then((cacheability) => {
          if (!cacheability || !cacheability.checkTTL()) pageNumbers.push(pageNumber);
        });

        return promise;
      }),
    );

    return pageNumbers;
  }

  /**
   *
   * @return {boolean}
   */
  async _hasAllPages() {
    return await this._pages.size() === this._totalPages;
  }

  /**
   *
   * @return {boolean}
   */
  _noPages() {
    return this._totalPages === 0;
  }

  /**
   *
   * @private
   * @param {string} cacheControl
   * @return {void}
   */
  _setCacheability(cacheControl) {
    const cacheability = new Cacheability();
    cacheability.parseCacheControl(cacheControl);

    if (!this._cacheability || this._cacheability.metadata.ttl > cacheability.metadata.ttl) {
      this._cacheability = cacheability;
    }
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
   * @return {number}
   */
  async pagesRequested() {
    return this._pages.size();
  }

  /**
   *
   * @return {Array<number>}
   */
  async requiredPages() {
    if (this._cacheability.checkTTL() && (this._noPages() || await this._hasAllPages())) {
      return [];
    }

    return this._getRequiredPageNumbers();
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
    this._pagination = null;
    this._results = null;
    this._totalPages = totalPages;
    this._totalResults = totalResults;
    this._buildPageRanges();
    this._setCacheability(cacheControl);
  }
}
