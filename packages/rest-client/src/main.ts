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
    /* tslint:disable object-literal-sort-keys */
    // Certifications
    movieCertifications: ["certification/movie/list", { method: GET_METHOD }],
    tvCertifications: ["certification/tv/list", { method: GET_METHOD }],
    // Collection
    collection: ["collection/{id}/{type?}", { method: GET_METHOD }],
    // Company
    company: ["company/{id}/{type?}", { method: GET_METHOD }],
    // Configuration
    configuration: ["configuration/{type?}", { method: GET_METHOD }],
    // Credit
    credit: ["credit/{id}", { method: GET_METHOD }],
    // Discover
    discoverMovie: ["discover/movie", { method: GET_METHOD }],
    discoverTv: ["discover/tv", { method: GET_METHOD }],
    // Find
    find: ["find/{id}", { method: GET_METHOD }],
    // Genres
    movieGenres: ["genre/movie/list", { method: GET_METHOD }],
    tvGenres: ["genre/tv/list", { method: GET_METHOD }],
    // Latest
    latest: ["{type}/latest", { method: GET_METHOD }],
    // Movie
    movie: ["movie/{id}/{type?}", { method: GET_METHOD }],
    // Network
    network: ["network/{id}/{type?}", { method: GET_METHOD }],
    // People
    person: ["person/{id}/{type?}", { method: GET_METHOD }],
    // Popular
    popular: ["{type}/popular", { method: GET_METHOD }],
    // Review
    review: ["review/{id}", { method: GET_METHOD }],
    // Search
    search: ["search/{type}", { method: GET_METHOD }],
    // TV
    tv: ["tv/{id}/{type?}", { method: GET_METHOD }],
    /* tslint:enable object-literal-sort-keys */
  },
);

export default restClient;
