import bodyParser from 'body-parser';
import Express from 'express';
import fetchMock from 'fetch-mock';
import request from 'supertest';
import dollygrip from '../../src/router';

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
export const createApp = function createApp() {
  const app = new Express();
  app.use('/graphql', bodyParser.json(), dollygrip());
  app.listen(3000);
  return app;
};

/**
 *
 * @param {string} endpoint
 * @param {Object} response
 * @return {Object}
 */
export const mockRestRequest = function mockRestRequest(endpoint, response) {
  const matcher = url => url === endpoint;
  fetchMock.mock(matcher, { body: JSON.stringify(response) });
};

/**
 *
 * @param {Object} app
 * @param {Object} body
 * @return {Promise}
 */
export const postRequest = function postRequest(app, body) {
  return request(app)
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(body));
};
