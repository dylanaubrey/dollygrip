import { get } from 'lodash';
import Certifications from '../../classes/certifications';
import { resolveRestResponse } from '../../helpers';
import getta from '../../../rest-client';
import logger from '../../../logger';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {Certifications}
 */
export default async function resolveCertifications(obj, args) {
  let res;

  try {
    if (args.media === 'movie') {
      res = await getta.getMovieCertifications();
    } else if (args.media === 'tv') {
      res = await getta.getTVCertifications();
    }
  } catch (errors) {
    logger.error('dollygrip::resolveCertifications', { errors });
  }

  return resolveRestResponse(res, get(res, ['data', '0', 'certifications'], null), Certifications);
}
