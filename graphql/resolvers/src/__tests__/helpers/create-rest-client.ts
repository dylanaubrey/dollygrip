import Cachemap from '@cachemap/core';
import map from '@cachemap/map';
import createDollygripRestClient from '@dollygrip/rest-client';

export default function createRestClient() {
  return createDollygripRestClient({
    cache: new Cachemap({ name: 'cachemap', store: map() }),
    queryParams: { apiKey: '12345' },
  });
}
