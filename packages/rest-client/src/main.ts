import Cachemap from "@cachemap/core";
import map from "@cachemap/map";
import createRestClient from "getta";
import { API_KEY, BASE_PATH, CACHE_NAME, GET_METHOD } from "./constants";
import pathTemplateCallback from "./helpers/path-template-callback";
import { ShortcutMethodNames } from "./types";

const restClient = createRestClient<ShortcutMethodNames>(
  {
    basePath: BASE_PATH,
    cache: new Cachemap({ name: CACHE_NAME, store: map() }),
    pathTemplateCallback,
    queryParams: { api_key: API_KEY },
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
    latest: ["{type}/latest", { method: GET_METHOD }],
    movie: ["movie/{id}/{type?}", { method: GET_METHOD }],
    network: ["network/{id}/{type?}", { method: GET_METHOD }],
    person: ["person/{id}/{type?}", { method: GET_METHOD }],
    popular: ["{type}/popular", { method: GET_METHOD }],
    review: ["review/{id}", { method: GET_METHOD }],
    search: ["search/{type}", { method: GET_METHOD }],
    tv: ["tv/{id}/{type?}", { method: GET_METHOD }],
  },
);

export default restClient;
