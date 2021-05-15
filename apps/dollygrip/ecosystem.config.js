module.exports = {
  apps: [
    {
      args: 'run start',
      name: 'dollygrip-client',
      script: 'npm',
    },
    {
      interpreter_args: '--inspect',
      name: 'dollygrip-server',
      script: './server/dist/cjs/index.js',
    },
  ],
};
