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
  queryParams: JsonObject & { apiKey: string; language?: string };
}
