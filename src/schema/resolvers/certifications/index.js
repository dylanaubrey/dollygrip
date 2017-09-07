import { get } from 'lodash';
import Certifications from '../../classes/certifications';
import getta from '../../../rest-client';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {Certifications}
 */
export default async function resolveCertifications(obj, args) {
  let res;

  if (args.format === 'movie') {
    res = await getta.getMovieCertifications();
  } else if (args.format === 'tv') {
    res = await getta.getTVCertifications();
  }

  const data = get(res, ['data', '0', 'certifications'], null);
  if (!data) return null;
  const cacheControl = get(res, ['metadata', '0', 'cacheControl'], null);
  if (cacheControl) data._metadata = { cacheControl };
  return new Certifications(data);
}
