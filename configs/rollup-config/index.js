const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { outputFileSync } = require('fs-extra');
const { basename, dirname } = require('path');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');

const { JS_ENV, MODULE_SYSTEM, NODE_ENV } = process.env;
const isJsEnvWeb = JS_ENV === 'web';
const isNodeEnvProd = NODE_ENV === 'production' || NODE_ENV === 'prod';
const packageDir = process.cwd();
const extensions = ['.js', '.jsx', '.json', '.ts', '.tsx'];
const external = id => !id.startsWith('.') && !id.startsWith('/');

const sourcemapPathTransform = sourcePath => {
  if (/node_modules/.test(sourcePath)) {
    return sourcePath;
  }

  return sourcePath.replace('../../src', `../${basename(packageDir)}/src/`);
};

const plugins = [
  nodeResolve({
    extensions,
    preferBuiltins: true,
  }),
  commonjs(),
  babel({
    babelHelpers: 'runtime',
    extensions,
    rootMode: 'upward',
  }),
  json(),
  image(),
];

if (isJsEnvWeb) {
  plugins.push(
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extract: true,
      modules: {
        generateScopeName: (name, filename) =>
          /\.modules\.css/.test(filename) ? `${basename(packageDir)}-${basename(dirname(filename))}__${name}` : name,
      },
    })
  );
}

if (isNodeEnvProd) {
  plugins.push(
    terser(),
    analyzer({
      writeTo: analysis => {
        outputFileSync(`${packageDir}/dist/production.analysis.txt`, analysis);
      },
    })
  );
}

module.exports = {
  external,
  input: `${packageDir}/src/index`,
  onwarn: ({ code, message }) => {
    if (code !== 'THIS_IS_UNDEFIEND') {
      console.error(message); // eslint-disable-line no-console
    }
  },
  output: {
    file: `${packageDir}/dist/${MODULE_SYSTEM}/index.js`,
    format: MODULE_SYSTEM,
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins,
};
