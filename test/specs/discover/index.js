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

describe('the discover movie type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(
      `${url}&sort_by=popularity.desc&include_adult=false&include_video=false&with_people=3%2C4`,
      rest.discover.movie.people['3&4']['popularity.desc'],
      { headers: discoverHeaders },
    );

    mockRestRequest(
      `${url}&sort_by=popularity.asc&include_adult=false&include_video=false&with_people=3%2C4`,
      rest.discover.movie.people['3&4']['popularity.asc'],
      { headers: discoverHeaders },
    );

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

  describe('when a query is sent with given search params', () => {
    let cursor;

    it('should return the movies that match those search params', async () => {
      const { body } = await postRequest(server, {
        query: discoverBase,
        variables: {
          connection: { first: 6 },
          cursor: { primaryType: 'number' },
          media: 'movie',
          movie: { withPeople: '3,4' },
        },
      });

      expect(body.data).to.eql(graphql.discover.movie.people['3&4']['popularity.desc']['1-6']);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
      cursor = body.data.discover.pageInfo.endCursor;
    });

    describe('when a query is sent for the next six movies with the given search params', () => {
      it('should return the next six movies that match those search params', async () => {
        const { body } = await postRequest(server, {
          query: discoverBase,
          variables: {
            connection: { after: cursor, first: 6 },
            cursor: { primaryType: 'number' },
            media: 'movie',
            movie: { withPeople: '3,4' },
          },
        });

        // expect(body.data).to.eql(
        //   graphql.discover.movie.people['3&4']['popularity.desc']['7-12'],
        // );

        expect(dollygrip._handl._execute.calledOnce).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(1);
        dollygrip._handl._execute.reset();
        fetchMock.reset();
      });
    });
  });
});
