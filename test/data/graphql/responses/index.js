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
      withMovies: require('./company/1/with-movies/index.json'),
      withMoviesExtra: require('./company/1/with-movies-extra/index.json'),
      with7To20Movies: require('./company/1/with-7-to-20-movies/index.json'),
      with21To26Movies: require('./company/1/with-21-to-26-movies/index.json'),
    },
  },
  configuration: require('./configuration/index.json'),
  credit: {
    '52542282760ee313280017f9': {
      base: require('./credit/52542282760ee313280017f9/base/index.json'),
      withExtraMedia: require('./credit/52542282760ee313280017f9/with-extra-media/index.json'),
      withExtraPerson: require('./credit/52542282760ee313280017f9/with-extra-person/index.json'),
    },
  },
};
