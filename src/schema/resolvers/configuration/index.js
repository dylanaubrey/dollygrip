import { get } from 'lodash';
import Configuration from '../../classes/configuration';
import { resolveRestResponse } from '../../helpers';
import getta from '../../../rest-client';
import logger from '../../../logger';

/**
 *
 * @return {Configuration}
 */
export default async function resolveConfiguration() {
  let res;

  try {
    res = await getta.getConfiguration();
  } catch (errors) {
    logger.error('dollygrip::resolveConfiguration', { errors });
  }

  return resolveRestResponse(res, get(res, ['data', '0'], null), Configuration);
}
