module.exports = api => {
  const { BABEL_DISABLE_CACHE, DEBUG, JS_ENV, NODE_ENV, TEST_ENV } = process.env;

  if (BABEL_DISABLE_CACHE) {
    api.cache.never();
  } else {
    api.cache.using(() => JS_ENV);
  }

  const isDebug = DEBUG === 'true';
  const isJsEnvWeb = JS_ENV === 'web';
  const isTestEnv = TEST_ENV === 'true';
  const isNodeEnvProd = NODE_ENV === 'production' || NODE_ENV === 'prod';
  const ignore = ['node_modules/**', '**/node_modules/**'];

  if (!isTestEnv) {
    ignore.push('**/*.spec.*', '**/*.test.*', '**/test.*', '**/__testUtils__/**', '**/__tests__/**', '**/__mocks__/**');
  }

  let targets;

  if (isJsEnvWeb) {
    targets = isDebug ? 'last 1 Chrome version' : 'defaults';
  } else {
    targets = isDebug ? 'current node' : 'maintained node versions';
  }

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: false,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    'babel-plugin-codegen',
    'babel-plugin-lodash',
    'babel-plugin-macros',
  ];

  if (isNodeEnvProd) {
    plugins.push([
      'babel-plugin-transform-react-remove-prop-types',
      {
        removeImports: true,
      },
    ]);
  }

  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: false,
        targets,
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: false,
        useBuiltIns: true,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
        allowNamespaces: true,
        onlyRemoveTypeImports: true,
      },
    ],
  ];

  return {
    comments: false,
    ignore,
    plugins,
    presets,
  };
};
