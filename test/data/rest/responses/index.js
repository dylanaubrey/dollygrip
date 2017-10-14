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
  company: {
    1: require('./company/1/index.json'),
    movies: {
      1: {
        page1: require('./company/1/movies/page-1/index.json'),
        page2: require('./company/1/movies/page-2/index.json'),
        page3: require('./company/1/movies/page-3/index.json'),
        page4: require('./company/1/movies/page-4/index.json'),
        page1000: require('./company/1/movies/page-1000/index.json'),
      },
    },
  },
  configuration: require('./configuration'),
  movie: {
    11: require('./movie/11/index.json'),
    85: require('./movie/85/index.json'),
    87: require('./movie/87/index.json'),
    89: require('./movie/89/index.json'),
    217: require('./movie/217/index.json'),
    838: require('./movie/838/index.json'),
    847: require('./movie/847/index.json'),
    1891: require('./movie/1891/index.json'),
    1892: require('./movie/1892/index.json'),
    1893: require('./movie/1893/index.json'),
    1894: require('./movie/1894/index.json'),
    1895: require('./movie/1895/index.json'),
    10372: require('./movie/10372/index.json'),
    10658: require('./movie/10658/index.json'),
    12144: require('./movie/12144/index.json'),
    12180: require('./movie/12180/index.json'),
    13597: require('./movie/13597/index.json'),
    13924: require('./movie/13924/index.json'),
    27064: require('./movie/27064/index.json'),
    28176: require('./movie/28176/index.json'),
    72431: require('./movie/72431/index.json'),
    140607: require('./movie/140607/index.json'),
    181808: require('./movie/181808/index.json'),
    181812: require('./movie/181812/index.json'),
    302429: require('./movie/302429/index.json'),
    330459: require('./movie/330459/index.json'),
  },
};
