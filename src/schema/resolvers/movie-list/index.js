import resolveMovie from '../movie';
import { resolveList } from '../../helpers';

/**
 *
 * @param {Object} obj
 * @param {Object} args
 * @param {Object} context
 * @param {Object} info
 * @return {Array<Movie>}
 */
export default async function resolveMovieList(obj, args, context, info) {
  return resolveList(obj, args, context, info, resolveMovie);
};
