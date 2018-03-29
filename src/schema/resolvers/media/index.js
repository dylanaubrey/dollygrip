import resolveMovie from '../movie';
import resolveTv from '../tv';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @param {string} mediaType
 * @return {Movie}
 */
export default async function resolveMedia(obj, args, context, info, mediaType) {
  if (mediaType === 'movie') {
    return resolveMovie(obj, args, context, info, { fragmentType: 'Movie' });
  }

  if (mediaType === 'tv') {
    return resolveTv(obj, args, context, info, { fragmentType: 'Tv' });
  }

  return null;
};
