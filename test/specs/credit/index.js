import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import {
  creditBase,
  creditWithExtraMedia,
  creditWithExtraPerson,
} from '../../data/graphql/requests/credit';

import graphql from '../../data/graphql/responses';
import rest from '../../data/rest/responses';
import { buildURL, createApps, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);

const headers = {
  'Cache-Control': 'public, max-age=28800',
  'Content-Type': 'application/json; charset=utf-8',
};

const tvMockArgs = {};

Object.keys(rest.tv).forEach((resource) => {
  tvMockArgs[resource] = {
    url: buildURL({ path: 'tv', resource }),
    res: rest.tv[resource],
  };
});

const personMockArgs = {};

Object.keys(rest.person).forEach((resource) => {
  personMockArgs[resource] = {
    url: buildURL({ path: 'person', resource }),
    res: rest.person[resource],
  };
});

const resource = '52542282760ee313280017f9';
const url = buildURL({ path: 'credit', resource });

describe('the credit type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(url, rest.credit[resource], { headers });

    Object.keys(tvMockArgs).forEach((key) => {
      mockRestRequest(tvMockArgs[key].url, tvMockArgs[key].res, { headers });
    });

    Object.keys(personMockArgs).forEach((key) => {
      mockRestRequest(personMockArgs[key].url, personMockArgs[key].res, { headers });
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

  describe('when a credit is requested with specific fields', () => {
    it('should return the credit with those fields', async () => {
      const { body } = await postRequest(server, {
        query: creditBase, variables: { id: resource },
      });

      expect(body.data).to.eql(graphql.credit[resource].base);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
    });

    describe('when a credit is requested with extra media fields', () => {
      it('should return the credit and the media with the extra fields', async () => {
        const { body } = await postRequest(server, {
          query: creditWithExtraMedia, variables: { id: resource },
        });

        expect(body.data).to.eql(graphql.credit[resource].withExtraMedia);
        expect(dollygrip._handl._execute.calledOnce).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(1);
        dollygrip._handl._execute.reset();
        fetchMock.reset();
      });
    });

    describe('when a credit is requested with extra person fields', () => {
      it('should return the credit and the person with the extra fields', async () => {
        const { body } = await postRequest(server, {
          query: creditWithExtraPerson, variables: { id: resource },
        });

        expect(body.data).to.eql(graphql.credit[resource].withExtraPerson);
        expect(dollygrip._handl._execute.calledOnce).to.be.true();
        expect(fetchMock.calls().matched).to.have.lengthOf(1);
        dollygrip._handl._execute.reset();
        fetchMock.reset();
      });
    });
  });
});
