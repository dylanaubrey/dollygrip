import { ShortcutMethodNames } from "@dollygrip/rest-client";
import { Getta, ShortcutProperties } from "getta";

export interface CertificationsArgs {
  screenType: ScreenType;
}

export interface CollectionArgs {
  id: number;
}

export interface Context {
  restClient: Getta & ShortcutProperties<ShortcutMethodNames>;
  [key: string]: any; // tslint:disable-line no-any
}

export enum ScreenType {
  MOVIE = "movie",
  TV = "tv",
}
