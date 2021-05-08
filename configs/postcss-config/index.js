const cssnano = require('cssnano');
const customProps = require('postcss-custom-properties');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const nested = require('postcss-nested');
const normalize = require('postcss-normalize');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    customProps(),
    cssnano,
    nested,
    flexbugsFixes,
    presetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    normalize,
  ],
};
