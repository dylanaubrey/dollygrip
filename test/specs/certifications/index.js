import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import sinonChai from 'sinon-chai';
import { movieQuery, tvQuery, variableQuery } from '../../data/graphql/requests/certification';
import graphql from '../../data/graphql/responses';
import rest from '../../data/rest/responses';
import { buildURL, createApps, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);

const paths = { movie: 'certification/movie/list', tv: 'certification/tv/list' };

const headers = {
  'Cache-Control': 'public, max-age=36000',
  'Content-Type': 'application/json; charset=utf-8',
};

describe('the certifications type', () => {
  let apps, dollygrip, server;

  before(() => {
    apps = createApps();
    dollygrip = apps.dollygrip;
    server = apps.server;
  });

  after(() => {
    fetchMock.restore();
    dollygrip.clearCaches();
  });

  describe('when specific certifications are requested with movie format', () => {
    it('should return the specific movie certifications', async () => {
      const url = buildURL(paths.movie);
      mockRestRequest(url, rest.certificationMovie, { headers });
      const res = await postRequest(server, { query: movieQuery });
      expect(res.body).to.eql(graphql.certificationMovie);
    });
  });
});
