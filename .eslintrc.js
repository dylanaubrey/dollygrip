module.exports = {
  extends: ['@dollygrip/eslint-config'],
  overrides: [
    {
      files: ['**/schema/src/types.ts'],
      rules: {
        '@typescript-eslint/no-use-before-define': 0,
        'typescript-sort-keys/interface': 0,
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  root: true,
};
