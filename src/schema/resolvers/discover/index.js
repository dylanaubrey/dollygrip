import resolveDiscoverMovies from './movies';
import resolveDiscoverTv from './tv';
import MovieConnection from '../../classes/movie-connection';
import TvConnection from '../../classes/tv-connection';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {MovieConnection|TvConnection}
 */
export default async function resolveDiscover(obj, args) {
  if (args.media === 'movie') {
    return new MovieConnection(await resolveDiscoverMovies(args));
  } else if (args.media === 'tv') {
    return new TvConnection(await resolveDiscoverTv(args));
  }

  return null;
}
