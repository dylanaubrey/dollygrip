import type { ShortcutMethodNames } from '@dollygrip/rest-client';
import type { Getta, ShortcutProperties } from 'getta';

export enum ScreenType {
  MOVIE = 'movie',
  TV = 'tv',
}

export interface CertificationsArgs {
  screenType: ScreenType;
}

export interface CollectionArgs {
  id: number;
}

export interface Context {
  [key: string]: any;
  restClient: Getta & ShortcutProperties<ShortcutMethodNames>; // tslint:disable-line no-any
}
