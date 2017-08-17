import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import { movieQuery, tvQuery, variableQuery } from '../../data/requests/certification';
import { certificationMovie, certificationTV } from '../../data/responses';
import { buildURL, createApp, mockRestRequest, postRequest } from '../../helpers';

chai.use(dirtyChai);
chai.use(sinonChai);
const moviePath = 'certification/movie/list';
const tvPath = 'certification/tv/list';

describe('the certifications type', () => {
  let app;

  before(() => {
    app = createApp();
  });

  describe('when specific certifications are requested with movie format', () => {
    beforeEach(() => {
      const url = buildURL(moviePath);
      mockRestRequest(url, certificationMovie);
    });

    it('should return those specific movie certifications', async () => {
      const res = await postRequest(app, { query: movieQuery });
      expect(res).to.eql(certificationMovie);
    });
  });
});
