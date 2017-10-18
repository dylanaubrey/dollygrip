import Getta from 'getta';

/**
 *
 * @type {string}
 */
const baseURL = 'https://api.themoviedb.org/3/';

/**
 *
 * @type {Object}
 */
const queryParams = { api_key: 'fds89afd098fdasjojl3jo9doijeojfd' };

/**
 *
 * @type {Getta}
 */
const getta = new Getta({ baseURL, queryParams });

// Certifications
getta.shortcut('get', 'getMovieCertifications', { path: 'certification/movie/list' });
getta.shortcut('get', 'getTVCertifications', { path: 'certification/tv/list' });

// Collection
getta.shortcut('get', 'getCollection', { path: 'collection' });
getta.shortcut('get', 'getCollectionImages', { path: 'collection/{id}/images' });

// Company
getta.shortcut('get', 'getCompany', { path: 'company' });
getta.shortcut('get', 'getCompanyMovies', { path: 'company/{id}/movies' });

// Configuration
getta.shortcut('get', 'getConfiguration', { path: 'configuration' });

// Credit
getta.shortcut('get', 'getCredit', { path: 'credit' });

// Discover
getta.shortcut('get', 'getDiscoverMovie', { path: 'discover/movie' });
getta.shortcut('get', 'getDiscoverTv', { path: 'discover/tv' });

// Movie
getta.shortcut('get', 'getMovie', { path: 'movie' });

// People
getta.shortcut('get', 'getPerson', { path: 'person' });

// Tv
getta.shortcut('get', 'getTv', { path: 'tv' });

// TODO

export default getta;
