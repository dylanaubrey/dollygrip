import Getta from 'getta';

/**
 *
 * @type {string}
 */
const baseURL = 'https://api.themoviedb.org/3/';

/**
 *
 * @type {Getta}
 */
const getta = new Getta({ baseURL });

/**
 *
 * @type {Object}
 */
const queryParams = { api_key: 'fds89afd098fdasjojl3jo9doijeojfd' };

// Certifications
getta.shortcut('get', 'getMovieCertifications', { path: 'certification/movie/list', queryParams });
getta.shortcut('get', 'getTVCertifications', { path: 'certification/tv/list', queryParams });

// TODO

export default getta;
