import createRestClient from "getta";
import { BASE_PATH, GET_METHOD } from "./constants";
import pathTemplateCallback from "./helpers/path-template-callback";
import { CreateRestClientParams, ShortcutMethodNames } from "./types";

export default function createDollygripRestClient({ cache, queryParams }: CreateRestClientParams) {
  return createRestClient<ShortcutMethodNames>(
    {
      basePath: BASE_PATH,
      cache,
      pathTemplateCallback,
      queryParams,
    },
    {
      certifications: ["certification/{type}/list", { method: GET_METHOD }],
      collection: ["collection/{id}/{type?}", { method: GET_METHOD }],
      company: ["company/{id}/{type?}", { method: GET_METHOD }],
      configuration: ["configuration/{type?}", { method: GET_METHOD }],
      credit: ["credit/{id}", { method: GET_METHOD }],
      discover: ["discover/{type}", { method: GET_METHOD }],
      find: ["find/{id}", { method: GET_METHOD }],
      genres: ["genre/{type}/list", { method: GET_METHOD }],
      keyword: ["genre/{id}", { method: GET_METHOD }],
      movie: ["movie/{id}/{type?}", { method: GET_METHOD }],
      network: ["network/{id}/{type?}", { method: GET_METHOD }],
      person: ["person/{id}/{type?}", { method: GET_METHOD }],
      popular: ["{type}/popular", { method: GET_METHOD }],
      review: ["review/{id}", { method: GET_METHOD }],
      search: ["search/{type}", { method: GET_METHOD }],
      trending: ["trending/{type}/{subType}", { method: GET_METHOD }],
      tv: ["tv/{id}/{type?}", { method: GET_METHOD }],
    },
  );
}
