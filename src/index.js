import Handl from 'handl';
import { isEmpty } from 'lodash';
import logger from './logger';
import getta from './rest-client';
import schema from './schema';

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
   * @return {void}
   */
  constructor() {
    this._getta = getta;
    this._handl = new Handl({ cachemapOptions, mode: 'internal', newInstance: true, schema });
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
        const errors = 'The request does not have a body.';
        logger.error(errors); // TODO: Log some request data as well...
        res.status(200).send({ errors });
        return;
      }

      try {
        const { query, variables } = req.body;
        const { cacheMetadata, data } = await this._handl.request(query, { variables });
        const cacheControl = cacheMetadata.get('query').printCacheControl();
        res.set({ 'Cache-Control': cacheControl, 'Content-Type': 'application/json' });
        res.status(200).send({ cacheMetadata: this._mapToObject(cacheMetadata), data });
      } catch (err) {
        logger.error(err); // TODO: Log some request data as well...
        res.status(500).end();
      }
    };
  }
}
