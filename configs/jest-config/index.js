const packageDir = process.cwd();
let packageName;

try {
  packageName = require(`${packageDir}/package.json`).name;
} catch {
  // no catch
}

const { DEBUG, JS_ENV } = process.env;
const isDebug = DEBUG === 'true';
const isJsEnvWeb = JS_ENV === 'web';
process.env.TEST_ENV = 'true';

const moduleNameMapper = {};

const transform = {
  '^.+\\.(js|jsx|ts|tsx)$': `${__dirname}/babelTransformer.js`,
};

if (isJsEnvWeb) {
  moduleNameMapper['^.+\\.css$'] = 'identity-obj-proxy';
  transform['^.+\\.css$'] = `${__dirname}/cssTransformer.js`;
  transform['^(?!.*\\.(css|js|jsx|json|ts|tsx)$)'] = `${__dirname}/fileTransformer.js`;
}

const testMatch = [
  '<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}',
  '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
  '<rootDir>/src/**/__tests__/*.{js,jsx,ts,tsx}',
];

if (isDebug) {
  testMatch.push(
    '<rootDir>/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/**/__tests__/*.{js,jsx,ts,tsx}'
  );
}

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/types.ts',
    '!**/*.spec.*',
    '!**/*.test.*',
    '!**/*.types.ts',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/__testUtils__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  displayName: packageName,
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper,
  rootDir: packageDir,
  testEnvironment: isJsEnvWeb ? 'jest-environment-jsdom-fourteen' : 'node',
  testMatch,
  testPathIgnorePatterns: ['/build/', '/config/', '/dist/', '/e2e/', '/reports/', '/scripts/', '/__snapshots__/'],
  transform,
};
