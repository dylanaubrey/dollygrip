import { get } from 'lodash';
import { camelCasePropNames } from '../../../helpers';
import ConnectionLoader from '../../../loaders/connection';
import logger from '../../../../logger';
import getta from '../../../../rest-client';

let connectionLoader;

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @return {MovieConnection}
 */
export default async function resolveCompanyMovies(obj, args) {
  if (!connectionLoader) connectionLoader = new ConnectionLoader();
  const resource = obj.id;
  const resourceLoader = connectionLoader.getResourceLoader(resource, args);

  resourceLoader.setCursorKeys({
    primary: { value: 'popularity', type: 'number' },
    secondary: { value: 'id', type: 'number' },
  });

  if (await resourceLoader.pagesRequested() === 0) {
    let res;

    try {
      res = await getta.getCompanyMovies({ resource });
    } catch (errors) {
      logger.error('dollygrip::resolveCompanyMovies', { errors });
    }

    await resourceLoader.setPageResults(
      camelCasePropNames(get(res, ['data', '0'], {})),
      get(res, ['metadata', '0'], {}),
    );
  }

  const required = await resourceLoader.requiredPages();
  if (!required.length) return resourceLoader.getData();
  let res;

  try {
    res = await Promise.all(
      required.map(page => getta.getCompanyMovies({ queryParams: { page }, resource })),
    );
  } catch (errors) {
    logger.error('dollygrip::resolveCompanyMovies', { errors });
  }

  await Promise.all(
    res.map(value => resourceLoader.setPageResults(
      camelCasePropNames(get(value, ['data', '0'], {})),
      get(value, ['metadata', '0'], {}),
    )),
  );

  return resourceLoader.getData();
}
