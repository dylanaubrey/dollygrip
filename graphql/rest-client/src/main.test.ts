import Cachemap from '@cachemap/core';
import map from '@cachemap/map';
import createDollygripRestClient from '.';

describe('createDollygripRestClient >', () => {
  describe('WHEN the dollygrip rest client is created >', () => {
    it('THEN it should have the correct properties and methods', () => {
      const restClient = createDollygripRestClient({
        cache: new Cachemap({ name: 'cachemap', store: map() }),
        queryParams: { apiKey: '12345' },
      });

      expect(restClient).toMatchSnapshot();
    });
  });
});
