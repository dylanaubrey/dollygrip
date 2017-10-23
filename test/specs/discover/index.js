import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { discoverBase } from '../../data/graphql/requests/discover';
import graphql from '../../data/graphql/responses';
import rest from '../../data/rest/responses';
import { buildURL, createApps, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);

const discoverHeaders = {
  'Cache-Control': 'public, max-age=21600',
  'Content-Type': 'application/json; charset=utf-8',
};

const movieHeaders = {
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

const url = buildURL({ path: 'discover/movie' });

describe.only('the discover movie type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(url, rest.discover.movie.people['3&4']['popularity.asc'], { discoverHeaders });
    mockRestRequest(url, rest.discover.movie.people['3&4']['popularity.desc'], { discoverHeaders });

    Object.keys(movieMockArgs).forEach((key) => {
      mockRestRequest(movieMockArgs[key].url, movieMockArgs[key].res, { movieHeaders });
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

  describe('when a discover movie query is sent with given search queries', () => {
    it('should return the movies that match those search queries', async () => {
      const { body } = await postRequest(server, {
        query: discoverBase,
        variables: {
          connection: { first: 6 },
          media: 'movie',
          movie: { withPeople: '3,4' },
        },
      });

      expect(body.data).to.eql(graphql.company[1].base);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
    });
  });
});
