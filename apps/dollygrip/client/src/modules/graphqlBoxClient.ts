import Cachemap from '@cachemap/core';
import indexedDB from '@cachemap/indexed-db';
import reaper from '@cachemap/reaper';
import introspection from '@dollygrip/schema/dist/introspection.json';
import cacheManager from '@graphql-box/cache-manager';
import Client from '@graphql-box/client';
import { DEFAULT_TYPE_ID_KEY } from '@graphql-box/core';
import debugManager from '@graphql-box/debug-manager';
import fetchManager from '@graphql-box/fetch-manager';
import requestParser from '@graphql-box/request-parser';
import type { IntrospectionQuery } from 'graphql';

export default () =>
  Client.init({
    cacheManager: cacheManager({
      cache: new Cachemap({
        name: 'GRAPHQL_BOX_CLIENT_CACHE',
        reaper: reaper({ interval: 300000 }),
        store: indexedDB(),
      }),
      cascadeCacheControl: true,
      typeCacheDirectives: {
        Query: 'public, max-age=5',
      },
    }),
    debugManager: debugManager({
      logger: {
        log: (...args) => {
          console.log(...args); // eslint-disable-line no-console
        },
      },
      name: 'GRAPHQL_BOX_CLIENT',
      performance: window.performance,
    }),
    requestManager: fetchManager({ batch: true, url: '/graphql' }),
    requestParser: requestParser({ introspection: (introspection as unknown) as IntrospectionQuery }),
    typeIDKey: DEFAULT_TYPE_ID_KEY,
  });
