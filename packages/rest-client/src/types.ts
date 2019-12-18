import Cachemap from "@cachemap/core";
import { JsonObject } from "type-fest";

export type ShortcutMethodNames =
  | "movieCertifications"
  | "tvCertifications"
  | "collection"
  | "company"
  | "configuration"
  | "credit"
  | "discoverMovie"
  | "discoverTv"
  | "find"
  | "latest"
  | "movie"
  | "movieGenre"
  | "network"
  | "person"
  | "popular"
  | "review"
  | "search"
  | "tv"
  | "tvGenres";

export interface CreateRestClientParams {
  cache: Cachemap;
  queryParams: JsonObject & { api_key: string; language?: string };
}
