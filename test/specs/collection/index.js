import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { collection10Base, collection10WithMovies } from '../../data/graphql/requests/collection';
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

const url = buildURL({ path: 'collection', resource: 10 });

describe('the collection type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(url, rest.collection[10], { headers });

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

  describe('when a collection is requested with an ID', () => {
    it('should return the collection', async () => {
      const { body } = await postRequest(server, { query: collection10Base });
      expect(body.data).to.eql(graphql.collection[10].base);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
    });

    describe('when the same collection is requested again', () => {
      it('should return the collection from the handl cache', async () => {
        const { body } = await postRequest(server, { query: collection10Base });
        expect(body.data).to.eql(graphql.collection[10].base);
        expect(dollygrip._handl._execute.notCalled).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(0);
      });
    });

    describe('when the same collection is requested with additional movie fields', () => {
      it('should return the collection with the additional movie data', async () => {
        const { body } = await postRequest(server, { query: collection10WithMovies });
        expect(body.data).to.eql(graphql.collection[10].withMovies);
        expect(dollygrip._handl._execute.calledOnce).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(9);
        dollygrip._handl._execute.reset();
        fetchMock.reset();
      });
    });
  });
});
