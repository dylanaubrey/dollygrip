/* eslint-disable global-require */

/**
 *
 * @type {Object}
 */
export default {
  certification: {
    movie: require('./certification/movie/index.json'),
    tv: require('./certification/tv/index.json'),
  },
  collection: {
    10: {
      base: require('./collection/10/base/index.json'),
      withMovies: require('./collection/10/with-movies/index.json'),
    },
  },
};
