import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import {
  movieQueryOne,
  movieQueryTwo,
  movieQueryThree,
  tvQuery,
} from '../../data/graphql/requests/certification';

import graphql from '../../data/graphql/responses';
import rest from '../../data/rest/responses';
import { buildURL, createApps, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);

const urls = {
  movie: buildURL('certification/movie/list'),
  tv: buildURL('certification/tv/list'),
};

const headers = {
  'Cache-Control': 'public, max-age=36000',
  'Content-Type': 'application/json; charset=utf-8',
};

describe('the certifications type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(urls.movie, rest.certificationMovie, { headers });
    mockRestRequest(urls.tv, rest.certificationTV, { headers });
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

  describe('when certifications are requested for movie format', () => {
    it('should return the movie certifications', async () => {
      const res = await postRequest(server, { query: movieQueryOne });
      expect(res.body).to.eql(graphql.certificationMovie);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
    });

    describe('when the same movie certifications is requested again', () => {
      it('should return the movie certifications from the handl cache', async () => {
        const res = await postRequest(server, { query: movieQueryTwo });
        const certifications = res.body.certifications;
        expect(Object.keys(certifications).length).to.eql(2);
        expect(!!certifications.US).to.be.true();
        expect(dollygrip._handl._execute.notCalled).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(0);
      });
    });

    describe('when one of the same movie certifications is requested again', () => {
      it('should return the movie certifications from the handl and getta caches', async () => {
        const res = await postRequest(server, { query: movieQueryThree });
        const certifications = res.body.certifications;
        expect(Object.keys(certifications).length).to.eql(3);
        expect(!!certifications.US && !!certifications.FR).to.be.true();
        expect(dollygrip._handl._execute.calledOnce).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(0);
        dollygrip._handl._execute.reset();
      });
    });

    describe('when the same certifications are requested for TV format', () => {
      it('should return the TV certifications', async () => {
        const res = await postRequest(server, { query: tvQuery });
        expect(res.body).to.eql(graphql.certificationTV);
        expect(dollygrip._handl._execute.calledOnce).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(1);
        dollygrip._handl._execute.reset();
        fetchMock.reset();
      });
    });
  });
});
