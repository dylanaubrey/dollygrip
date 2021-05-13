import { COLLECTION_PATH, ShortcutMethodNames } from '@dollygrip/rest-client';
import type { Collection } from '@dollygrip/schema';
import fetchMock from 'fetch-mock';
import type { Getta, ShortcutProperties } from 'getta';
import buildEndpoint from './__tests__/helpers/build-endpoint';
import createRestClient from './__tests__/helpers/create-rest-client';
import collectionDetails from './__tests__/responses/collection/details.json';
import collectionTranslations from './__tests__/responses/collection/translations.json';
import resolveCollectionTranslations from './collection-translations';

describe('resolveCollectionImages >', () => {
  let restClient: Getta & ShortcutProperties<ShortcutMethodNames>;

  beforeAll(() => {
    fetchMock.get(buildEndpoint(COLLECTION_PATH, { id: 10, type: 'translations' }), collectionTranslations);
    restClient = createRestClient();
  });

  it('THEN the resolver should return the collection translations', async () => {
    expect(
      await resolveCollectionTranslations(collectionDetails as unknown as Collection, undefined, { restClient })
    ).toMatchSnapshot();
  });
});
