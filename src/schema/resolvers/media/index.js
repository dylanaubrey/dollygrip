import { snakeCase } from 'lodash';
import resolveMovie from '../movie';
import resolveTV from '../tv';
import { getCurrentFieldNode, getName } from '../../helpers';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Movie}
 */
export default async function resolveMedia(obj, args, context, info) {
  const currentFieldNode = getCurrentFieldNode(info);
  const fieldData = obj[snakeCase(getName(currentFieldNode))];

  if (obj.media_type === 'movie') {
    return resolveMovie(fieldData, args, context, info, { fragmentType: 'Movie' });
  }

  if (obj.media_type === 'tv') {
    return resolveTV(fieldData, args, context, info, { fragmentType: 'Tv' });
  }

  return null;
};
