const config = require('@dollygrip/rollup-config');

module.exports = {
  ...config({
    copy: {
      targets: [{ dest: ['dist/cjs', 'dist/esm'], src: 'src/schema.graphql' }],
    },
  }),
};
