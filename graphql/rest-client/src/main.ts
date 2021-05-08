import createRestClient from 'getta';
import {
  BASE_PATH,
  CERTIFICATIONS_PATH,
  COLLECTION_PATH,
  COMPANY_PATH,
  CONFIGURATION_PATH,
  CREDIT_PATH,
  DISCOVER_PATH,
  FIND_PATH,
  GENRE_PATH,
  GET_METHOD,
  KEYWORD_PATH,
  MOVIE_PATH,
  NETWORK_PATH,
  PERSON_PATH,
  POPULAR_PATH,
  REVIEW_PATH,
  SEARCH_PATH,
  TRENDING_PATH,
  TV_PATH,
} from './constants';
import pathTemplateCallback from './helpers/path-template-callback';
import type { CreateRestClientParams, ShortcutMethodNames } from './types';

export default function createDollygripRestClient({ cache, queryParams }: CreateRestClientParams) {
  return createRestClient<ShortcutMethodNames>(
    {
      basePath: BASE_PATH,
      cache,
      pathTemplateCallback,
      queryParams,
    },
    {
      certifications: [CERTIFICATIONS_PATH, { method: GET_METHOD }],
      collection: [COLLECTION_PATH, { method: GET_METHOD }],
      company: [COMPANY_PATH, { method: GET_METHOD }],
      configuration: [CONFIGURATION_PATH, { method: GET_METHOD }],
      credit: [CREDIT_PATH, { method: GET_METHOD }],
      discover: [DISCOVER_PATH, { method: GET_METHOD }],
      find: [FIND_PATH, { method: GET_METHOD }],
      genres: [GENRE_PATH, { method: GET_METHOD }],
      keyword: [KEYWORD_PATH, { method: GET_METHOD }],
      movie: [MOVIE_PATH, { method: GET_METHOD }],
      network: [NETWORK_PATH, { method: GET_METHOD }],
      person: [PERSON_PATH, { method: GET_METHOD }],
      popular: [POPULAR_PATH, { method: GET_METHOD }],
      review: [REVIEW_PATH, { method: GET_METHOD }],
      search: [SEARCH_PATH, { method: GET_METHOD }],
      trending: [TRENDING_PATH, { method: GET_METHOD }],
      tv: [TV_PATH, { method: GET_METHOD }],
    }
  );
}
