import type Cachemap from '@cachemap/core';
import type { JsonObject } from 'type-fest';

export type ShortcutMethodNames =
  | 'certifications'
  | 'collection'
  | 'company'
  | 'configuration'
  | 'credit'
  | 'discover'
  | 'find'
  | 'genres'
  | 'latest'
  | 'movie'
  | 'network'
  | 'person'
  | 'popular'
  | 'review'
  | 'search'
  | 'tv';

export interface CreateRestClientParams {
  cache: Cachemap;
  // eslint-disable-next-line camelcase
  queryParams: JsonObject & { api_key: string; language?: string };
}
