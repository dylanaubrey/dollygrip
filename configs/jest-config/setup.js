require('@testing-library/jest-dom/extended-expect');
require('snapshot-diff/extend-expect');
require('cross-fetch/polyfill');

if (typeof window !== 'undefined') {
  Object.keys(process.env).forEach(key => {
    window[key] = process.env[key];
  });

  Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
  Object.defineProperty(window, 'scroll', { value: () => {}, writable: true });
}
