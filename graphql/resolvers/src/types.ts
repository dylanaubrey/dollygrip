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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Context = Record<string, any> & {
  restClient: Getta & ShortcutProperties<ShortcutMethodNames>;
};
