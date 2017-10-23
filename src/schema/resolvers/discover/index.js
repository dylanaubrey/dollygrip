import resolveDiscoverMovies from './movies';
import resolveDiscoverTv from './tv';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {MovieConnection|TvConnection}
 */
export default async function resolveDiscover(obj, args) {
  if (args.media === 'movie') {
    return resolveDiscoverMovies(args);
  } else if (args.media === 'tv') {
    return resolveDiscoverTv(args);
  }

  return null;
}
