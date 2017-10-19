/* eslint-disable camelcase */

import { get } from 'lodash';
import { convertPropNames } from '../../../helpers';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let connectionLoader;

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {TvConnection}
 */
export default async function resolveDiscoverTv(obj, args) {
  // TODO
}
