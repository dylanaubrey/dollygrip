import Getta from 'getta';

const baseURL = 'https://api.themoviedb.org/3/';
const getta = new Getta({ baseURL });
const queryParams = { api_key: 'a72b9817273c73f7f29e4b5fed389155' };

// Certifications
getta.shortcut('get', 'getMovieCertifications', { path: 'certification/movie/list', queryParams });
getta.shortcut('get', 'getTVCertifications', { path: 'certification/tv/list', queryParams });

// TODO

export default getta;
