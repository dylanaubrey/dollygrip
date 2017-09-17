/* eslint-disable global-require */

/**
 *
 * @type {Object}
 */
export default {
  certification: {
    movie: require('./certification/movie/list/index.json'),
    tv: require('./certification/tv/list/index.json'),
  },
  collection: {
    10: require('./collection/10/index.json'),
    images: {
      10: require('./collection/10/images/index.json'),
    },
  },
  movie: {
    11: require('./movie/11/index.json'),
    1891: require('./movie/1891/index.json'),
    1892: require('./movie/1892/index.json'),
    1893: require('./movie/1893/index.json'),
    1894: require('./movie/1894/index.json'),
    1895: require('./movie/1895/index.json'),
    140607: require('./movie/140607/index.json'),
    181808: require('./movie/181808/index.json'),
    181812: require('./movie/181812/index.json'),
  },
};
