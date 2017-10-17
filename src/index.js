import Handl from 'handl';
import { isEmpty } from 'lodash';
import logger from './logger';
import getta from './rest-client';
import schema from './schema';
import fieldResolver from './schema/default-resolver';

require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 *
 * @type {Object}
 */
const cachemapOptions = { obj: { redisOptions: { db: 1 } }, res: { redisOptions: { db: 2 } } };

/**
 *
 * The dollygrip
 */
export default class Dollygrip {
  /**
   *
   * @constructor
   * @return {Dollygrip}
   */
  constructor() {
    this._getta = getta;

    this._handl = new Handl({
      cachemapOptions, fieldResolver, mode: 'internal', newInstance: true, schema,
    });

    this._bindEvents();
  }

  /**
   *
   * @private
   * @return {void}
   */
  _bindEvents() {
    this._bindUnhandledRejectionHandler();
  }

  /**
   *
   * @private
   * @return {void}
   */
  _bindUnhandledRejectionHandler() {
    process.on('unhandledRejection', (err) => {
      logger.error('An unhandled promise rejection has occurred.', { errors: err });
      this.clearCaches();
    });
  }

  /**
   *
   * @param {Map} map
   * @return {Object}
   */
  _mapToObject(map) {
    const obj = {};

    map.forEach((cacheability, key) => {
      obj[key] = cacheability.metadata;
    });

    return obj;
  }

  /**
   *
   * @return {void}
   */
  clearCaches() {
    this._getta.clearCache();
    this._handl.clearCache();
  }

  /**
   *
   * @return {Function}
   */
  route() {
    return async (req, res) => {
      if (isEmpty(req.body)) {
        const message = 'The request does not have a body.';
        logger.error(message); // TODO: Log some request data as well...
        res.status(400).send(message);
        return;
      }

      try {
        const { fragments, query, variables } = req.body;
        const opts = { fragments, variables };
        const { cacheMetadata, data } = await this._handl.request(query, opts);
        const cacheControl = cacheMetadata.get('query').printCacheControl();
        res.set({ 'Cache-Control': cacheControl, 'Content-Type': 'application/json' });
        res.status(200).send({ cacheMetadata: this._mapToObject(cacheMetadata), data });
      } catch (err) {
        const message = 'An internal server error has occurred.';
        logger.error(message, { errors: err }); // TODO: Log some request data as well...
        res.status(500).end(message, { errors: err });
      }
    };
  }
}
