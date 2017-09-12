import { snakeCase } from 'lodash';
import resolveMovie from '../movie';
import { getCurrentFieldNode, getName } from '../../helpers';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Array<Movie>}
 */
export default async function resolveMovieList(obj, args, context, info) {
  const currentFieldNode = getCurrentFieldNode(info);
  const fieldData = obj[snakeCase(getName(currentFieldNode))];
  const promises = [];

  fieldData.forEach((value) => {
    promises.push(resolveMovie(value, args, context, info));
  });

  return Promise.all(promises);
};
