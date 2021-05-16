import Cachemap from '@cachemap/core';
import map from '@cachemap/map';
import reaper from '@cachemap/reaper';
import resolvers, { defaultFieldResolver } from '@dollygrip/resolvers';
import createDollygripRestClient from '@dollygrip/rest-client';
import { typeDefs } from '@dollygrip/schema';
import cacheManager from '@graphql-box/cache-manager';
import Client from '@graphql-box/client';
import { DEFAULT_TYPE_ID_KEY } from '@graphql-box/core';
import debugManager from '@graphql-box/debug-manager';
import execute from '@graphql-box/execute';
import requestParser from '@graphql-box/request-parser';
import Server from '@graphql-box/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { performance } from 'perf_hooks';

const schema = makeExecutableSchema({ resolvers, typeDefs });

export default async ({ apiKey }: { apiKey: string }) =>
  Server.init({
    client: await Client.init({
      cacheManager: cacheManager({
        cache: new Cachemap({
          name: 'GRAPHQL_BOX_CLIENT_CACHE',
          reaper: reaper({ interval: 300000 }),
          store: map(),
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
        name: 'GRAPHQL_BOX_SERVER',
        performance,
      }),
      requestManager: execute({
        contextValue: {
          restClient: createDollygripRestClient({
            cache: new Cachemap({
              name: 'GRAPHQL_BOX_REST_CLIENT_CACHE',
              reaper: reaper({ interval: 300000 }),
              store: map(),
            }),
            queryParams: { apiKey },
          }),
        },
        fieldResolver: defaultFieldResolver,
        schema,
      }),
      requestParser: requestParser({ schema }),
      typeIDKey: DEFAULT_TYPE_ID_KEY,
    }),
  });
