import { COLLECTION_PATH, ShortcutMethodNames } from '@dollygrip/rest-client';
import fetchMock from 'fetch-mock';
import type { Getta, ShortcutProperties } from 'getta';
import buildEndpoint from './__tests__/helpers/build-endpoint';
import createRestClient from './__tests__/helpers/create-rest-client';
import collectionDetails from './__tests__/responses/collection/details.json';
import resolveCollection from './collection';

describe('resolveCollection >', () => {
  let restClient: Getta & ShortcutProperties<ShortcutMethodNames>;

  beforeAll(() => {
    fetchMock.get(buildEndpoint(COLLECTION_PATH, { id: 10 }), collectionDetails);
    restClient = createRestClient();
  });

  afterAll(() => {
    fetchMock.restore();
  });

  describe('GIVEN a collection id >', () => {
    it('THEN the resolver should return the collection details', async () => {
      expect(await resolveCollection({}, { id: 10 }, { restClient })).toMatchSnapshot();
    });
  });
});
