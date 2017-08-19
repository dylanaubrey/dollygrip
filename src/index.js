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
    this._handl = new Handl({ cachemapOptions, mode: 'internal', newInstance: true, schema });
  }

  /**
   *
   * @return {void}
   */
  clearCaches() {
    this._handl.clearCache();
    getta.clearCache();
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
        const body = await this._handl.request(query, { variables });
        // TODO: Need to get cache header back as well...
        res.status(200).send(body);
      } catch (err) {
        logger.error(err); // TODO: Log some request data as well...
        res.status(500).end();
      }
    };
  }
}
