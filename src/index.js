import Handl from 'handl';
import { isEmpty } from 'lodash';
import logger from './logger';
import getta from './rest-client';
import schema from './schema';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const cachemapOptions = { obj: { redisOptions: { db: 1 } }, res: { redisOptions: { db: 2 } } };
const handl = new Handl({ cachemapOptions, mode: 'internal', schema });

/**
 *
 * The dollygrip
 */
export default class Dollygrip {
  /**
   *
   * @return {void}
   */
  clearCaches() {
    handl.clearCache();
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
        res.status(200).send(await handl.request(query, { variables }));
      } catch (err) {
        logger.error(err); // TODO: Log some request data as well...
        res.status(500).end();
      }
    };
  }
}
