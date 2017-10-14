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
      withImages: require('./collection/10/with-images/index.json'),
      withMovies: require('./collection/10/with-movies/index.json'),
    },
  },
  company: {
    1: {
      base: require('./company/1/base/index.json'),
      withMovies: require('./company/1/with-movies'),
      withMoviesExtra: require('./company/1/with-movies-extra'),
      with7To20Movies: require('./company/1/with-7-to-20-movies'),
      with21To26Movies: require('./company/1/with-21-to-26-movies'),
    },
  },
  configuration: require('./configuration'),
};
