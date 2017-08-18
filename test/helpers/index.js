import bodyParser from 'body-parser';
import Express from 'express';
import fetchMock from 'fetch-mock';
import request from 'supertest';
import Dollygrip from '../../src';

/**
 *
 * @type {string}
 */
const baseURL = 'https://api.themoviedb.org/3/';

/**
 *
 * @type {Object}
 */
const defaultQueryParams = { api_key: 'a72b9817273c73f7f29e4b5fed389155' };

/**
 *
 * @param {Object} queryParams
 * @return {string}
 */
export const buildQueryString = function buildQueryString(queryParams = {}) {
  const mergedParams = { ...queryParams, ...defaultQueryParams };
  let queryString = '';
  let paramCount = 0;

  Object.keys(mergedParams).forEach((key) => {
    paramCount += 1;
    const prefix = paramCount === 1 ? '?' : '&';
    queryString += `${prefix}${key}=${mergedParams[key]}`;
  });

  return queryString;
};

/**
 *
 * @param {string} path
 * @param {Object} queryParams
 * @return {string}
 */
export const buildURL = function buildURL(path, queryParams) {
  return `${baseURL}${path}${buildQueryString(queryParams)}`;
};

/**
 *
 * @return {Express}
 */
export const createApps = function createApps() {
  const server = new Express();
  const dollygrip = new Dollygrip();
  server.use('/graphql', bodyParser.json(), dollygrip.route());
  server.listen(3000);
  return { server, dollygrip };
};

/**
 *
 * @param {string} endpoint
 * @param {Object} body
 * @param {Object} [opts]
 * @return {Object}
 */
export const mockRestRequest = function mockRestRequest(endpoint, body, opts = {}) {
  const matcher = url => url === endpoint;
  const response = { body: JSON.stringify(body), ...opts };
  fetchMock.mock(matcher, response);
};

/**
 *
 * @param {Object} server
 * @param {Object} body
 * @return {Promise}
 */
export const postRequest = function postRequest(server, body) {
  return request(server)
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(body));
};
