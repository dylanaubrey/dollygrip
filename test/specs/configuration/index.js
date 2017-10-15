import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fetchMock from 'fetch-mock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import configurationQuery from '../../data/graphql/requests/configuration';
import graphql from '../../data/graphql/responses';
import rest from '../../data/rest/responses';
import { buildURL, createApps, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);

const headers = {
  'Cache-Control': 'public, max-age=36000',
  'Content-Type': 'application/json; charset=utf-8',
};

const url = buildURL({ path: 'configuration' });

describe('the configuration type', () => {
  let apps, dollygrip, server;

  before(() => {
    mockRestRequest(url, rest.configuration, { headers });
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

  describe('when a configuration is requested with specific fields', () => {
    it('should return the configuration with those fields', async () => {
      const { body } = await postRequest(server, { query: configurationQuery });
      expect(body.data).to.eql(graphql.configuration);
      expect(dollygrip._handl._execute.calledOnce).to.be.true();
      expect(fetchMock.calls().matched).to.have.lengthOf(1);
      dollygrip._handl._execute.reset();
      fetchMock.reset();
    });
  });
});
