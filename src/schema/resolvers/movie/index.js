import { get } from 'lodash';
import Movie from '../../classes/movie';
import getta from '../../../rest-client';

/**
 *
 * @param {Object} obj
 * @return {Array<Movie>}
 */
export default async function resolveMovie() {
  // TODO: Need to parse query and data returned to see if
  // all the data is already available in the summary
  // of a movieType that each movie list returns. If all
  // the data is present, then return the data, otherwise
  // query the movie endpoint to get all the movie info.
}
