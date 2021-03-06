import { get } from 'lodash';
import md5 from 'md5';
import { camelCasePropNames, snakeCasePropNames } from '../../../helpers';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let connectionLoader;

/**
 *
 * @param {Object} data
 * @param {Array<Object>} data.edges
 * @return {Object}
 */
const addEdgeMediaType = function addEdgeMediaType(data) {
  data.edges.forEach((value) => {
    value.mediaType = 'movie';
  });

  return data;
};

/**
 *
 * @param {Object} args
 * @param {Object} args.connection
 * @param {Object} args.movie
 * @return {MovieConnection}
 */
export default async function resolveDiscoverMovies({ connection, cursor, movie }) {
  if (!connectionLoader) connectionLoader = new ConnectionLoader();
  const key = md5(JSON.stringify(movie));
  const resourceLoader = connectionLoader.getResourceLoader(key, connection);
  const [primaryCursorKey, cursorDirection] = movie.sortBy.split('.');

  resourceLoader.setCursorKeys({
    primary: { sortOrder: cursorDirection, type: cursor.primaryType, value: primaryCursorKey },
    secondary: { value: 'id', type: 'number' },
  });

  if (await resourceLoader.pagesRequested() === 0) {
    let res;

    try {
      res = await getta.getDiscoverMovie({ queryParams: snakeCasePropNames(movie) });
    } catch (errors) {
      logger.error('dollygrip::resolveDiscoverMovies', { errors });
    }

    await resourceLoader.setPageResults(
      camelCasePropNames(get(res, ['data', '0'], {})),
      get(res, ['metadata', '0'], {}),
    );
  }

  const required = await resourceLoader.requiredPages();
  if (!required.length) return resourceLoader.getData({ decorator: addEdgeMediaType });

  let res;

  try {
    res = await Promise.all(
      required.map(page => getta.getDiscoverMovie({
        queryParams: { ...snakeCasePropNames(movie), page },
      })),
    );
  } catch (errors) {
    logger.error('dollygrip::resolveDiscoverMovies', { errors });
  }

  await Promise.all(
    res.map(value => resourceLoader.setPageResults(
      camelCasePropNames(get(value, ['data', '0'], {})),
      get(value, ['metadata', '0'], {}),
    )),
  );

  return resourceLoader.getData({ decorator: addEdgeMediaType });
}
