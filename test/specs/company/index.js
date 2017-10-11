import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import {
  company1Base,
  company1WithMovies,
  company1WithMoviesExtra,
  company1WithNextMovies,
} from '../../data/graphql/requests/company';

import graphql from '../../data/graphql/responses';
import rest from '../../data/rest/responses';
import { buildURL, createApps, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);

const headers = {
  'Cache-Control': 'public, max-age=28800',
  'Content-Type': 'application/json; charset=utf-8',
};

const movieMockArgs = {};

Object.keys(rest.movie).forEach((resource) => {
  movieMockArgs[resource] = {
    url: buildURL({ path: 'movie', resource }),
    res: rest.movie[resource],
  };
});

const url = buildURL({ path: 'company', resource: 1 });
const moviesURL = buildURL({ path: 'company/{id}/movies', resource: 1 });

describe('the company type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(url, rest.company[1], { headers });
    mockRestRequest(moviesURL, rest.company.movies[1].page1, { headers });

    Object.keys(movieMockArgs).forEach((key) => {
      mockRestRequest(movieMockArgs[key].url, movieMockArgs[key].res, { headers });
    });

    apps = createApps();
    dollygrip = apps.dollygrip;
    server = apps.server;
    spy(dollygrip._handl, '_execute');
  });

  after(() => {
    dollygrip._handl._execute.restore();
    fetchMock.restore();
    dollygrip.clearCaches();
  });

  describe('when a company is requested with an ID', () => {
    it('should return the company', async () => {
      const { body } = await postRequest(server, { query: company1Base });
      expect(body.data).to.eql(graphql.company[1].base);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
    });

    describe('when the same company is requested with its movies', () => {
      describe('when the first six movies are requested', () => {
        it('should return the company with its first six movies', async () => {
          const { body } = await postRequest(server, { query: company1WithMovies });
          expect(body.data).to.eql(graphql.company[1].withMovies);
          expect(dollygrip._handl._execute.calledOnce).to.be.true();
          expect(fetchMock.calls().matched).to.have.lengthOf(1);
          dollygrip._handl._execute.reset();
          fetchMock.reset();
        });
      });

      let cursor;

      describe('when the first six movies are requested with extra details', () => {
        it('should return the company with its first six movies with extra details', async () => {
          const { body } = await postRequest(server, { query: company1WithMoviesExtra });
          expect(body.data).to.eql(graphql.company[1].withMoviesExtra);
          expect(dollygrip._handl._execute.calledOnce).to.be.true();
          expect(fetchMock.calls().matched).to.have.lengthOf(6);
          dollygrip._handl._execute.reset();
          fetchMock.reset();
          cursor = body.data.company.movies.edges[5].cursor;
        });
      });

      describe('when the next 12 movies are requested with extra details', () => {
        it('should return the next 12 movies with extra details', async () => {
          const { body } = await postRequest(server, {
            query: company1WithNextMovies, variables: { after: cursor, first: 6, id: 1 },
          });

          expect(body.data).to.eql(graphql.company[1].withMoviesExtra);
          expect(dollygrip._handl._execute.calledOnce).to.be.true();
          expect(fetchMock.calls().matched).to.have.lengthOf(6);
          dollygrip._handl._execute.reset();
          fetchMock.reset();
        });
      });
    });
  });
});
