import { CERTIFICATIONS_PATH, ShortcutMethodNames } from '@dollygrip/rest-client';
import fetchMock from 'fetch-mock';
import type { Getta, ShortcutProperties } from 'getta';
import buildEndpoint from './__tests__/helpers/build-endpoint';
import createRestClient from './__tests__/helpers/create-rest-client';
import movieCertifications from './__tests__/responses/certifications/movie.json';
import tvCertifications from './__tests__/responses/certifications/tv.json';
import resolveCertifications from './certifications';
import { ScreenType } from './types';

describe('resolveCertifications >', () => {
  let restClient: Getta & ShortcutProperties<ShortcutMethodNames>;

  beforeAll(() => {
    restClient = createRestClient();
  });

  afterAll(() => {
    fetchMock.restore();
  });

  describe("GIVEN the screenType is 'MOVIE' >", () => {
    beforeAll(() => {
      fetchMock.get(buildEndpoint(CERTIFICATIONS_PATH, { type: ScreenType.MOVIE }), movieCertifications);
    });

    it('THEN the resolver should return the movie certifications', async () => {
      expect(await resolveCertifications({}, { screenType: ScreenType.MOVIE }, { restClient })).toMatchSnapshot();
    });
  });

  describe("GIVEN the screenType is 'TV' >", () => {
    beforeAll(() => {
      fetchMock.get(buildEndpoint(CERTIFICATIONS_PATH, { type: ScreenType.TV }), tvCertifications);
    });

    it('THEN the resolver should return the movie certifications', async () => {
      expect(await resolveCertifications({}, { screenType: ScreenType.TV }, { restClient })).toMatchSnapshot();
    });
  });
});
