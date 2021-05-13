const { configs } = require('@typescript-eslint/eslint-plugin');
const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseES6Rules } = require('eslint-config-airbnb-base/rules/es6');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

const noUnusedVars = { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: true, vars: 'all' };
const noUseBeforeDefine = { functions: false };

module.exports = {
  env: {
    browser: true,
    'cypress/globals': true,
    jest: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'typescript-sort-keys'],
      rules: {
        ...configs.recommended.rules,
        ...configs['recommended-requiring-type-checking'].rules,
        '@typescript-eslint/dot-notation': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/naming-convention': [
          2,
          {
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            selector: 'variable',
          },
          {
            format: ['camelCase', 'PascalCase'],
            selector: 'function',
          },
          {
            format: ['PascalCase'],
            selector: 'typeLike',
          },
          {
            custom: {
              match: false,
              regex: '^I[A-Z]',
            },
            format: ['PascalCase'],
            selector: 'interface',
          },
          {
            custom: {
              match: false,
              regex: '^T[A-Z]',
            },
            format: ['PascalCase'],
            selector: 'typeLike',
          },
        ],
        '@typescript-eslint/no-array-constructor': baseStyleRules['no-array-constructor'],
        '@typescript-eslint/no-dupe-class-members': baseES6Rules['no-dupe-class-members'],
        '@typescript-eslint/no-empty-function': baseBestPracticesRules['no-empty-function'],
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-implied-eval': baseBestPracticesRules['no-implied-eval'],
        '@typescript-eslint/no-loop-func': baseBestPracticesRules['no-loop-func'],
        '@typescript-eslint/no-magic-numbers': baseBestPracticesRules['no-magic-numbers'],
        '@typescript-eslint/no-redeclare': baseBestPracticesRules['no-redeclare'],
        '@typescript-eslint/no-shadow': 0,
        '@typescript-eslint/no-throw-literal': baseBestPracticesRules['no-throw-literal'],
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unused-expressions': baseBestPracticesRules['no-unused-expressions'],
        '@typescript-eslint/no-unused-vars': [2, noUnusedVars],
        '@typescript-eslint/no-use-before-define': [
          2,
          { ...noUseBeforeDefine, enums: true, ignoreTypeReferences: false, typedefs: true },
        ],
        '@typescript-eslint/no-useless-constructor': baseES6Rules['no-useless-constructor'],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/quotes': baseStyleRules.quotes,
        '@typescript-eslint/require-await': baseBestPracticesRules['require-await'],
        '@typescript-eslint/return-await': baseBestPracticesRules['no-return-await'],
        camelCase: 0,
        'dot-notation': 0,
        'no-array-constructor': 0,
        'no-dupe-class-member': 0,
        'no-empty-function': 0,
        'no-implied-eval': 0,
        'no-loop-func': 0,
        'no-magic-numbers': 0,
        'no-new-func': 0,
        'no-redeclare': 0,
        'no-return-await': 0,
        'no-shadow': 0,
        'no-throw-literal': 0,
        'no-undef': 0,
        'no-unused-expressions': 0,
        'no-unused-vars': 0,
        'no-use-before-define': 0,
        'no-useless-constructor': 0,
        quotes: 0,
        'react/require-default-props': 0,
        'require-await': 0,
        'typescript-sort-keys/interface': 2,
        'typescript-sort-keys/string-enum': 2,
      },
      settings: {
        'import/extensions': ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
      },
    },
  ],
  parser: 'babel-eslint',
  plugins: ['cypress', 'prettier', 'sort-class-members', 'sort-keys-fix', 'sort-destructure-keys', 'react-hooks'],
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'func-names': [2, 'as-needed'],
    'global-require': 0,
    'import/extensions': [2, { css: 'always', js: 'never', json: 'always', ts: 'never', tsx: 'never' }],
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: [
          '**/.*',
          '**/*.config.{js,ts}',
          '**/*.setup.{js,ts}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/test.{js,jsx,ts,tsx}',
          '**/*.stories.{js,jsx,ts,tsx}',
          '**/__testUtils__/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/.storybook/**',
        ],
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': [2, { ignore: ['vscode'] }],
    'import/order': [
      2,
      {
        alphabetize: { caseInsensitive: false, order: 'asc' },
        groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'max-len': [
      2,
      {
        code: 120,
        comments: 100,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'no-debugger': 1,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, noUnusedVars],
    'no-use-before-define': [2, noUseBeforeDefine],
    'one-var': [2, { initialized: 'never' }],
    'one-var-declaration-per-line': [2, 'initializations'],
    'padding-line-between-statements': [
      2,
      { blankLine: 'any', next: '*', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-block-like' },
      { blankLine: 'always', next: 'multiline-block-like', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-expression' },
      { blankLine: 'always', next: 'multiline-expression', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'directive' },
      { blankLine: 'always', next: 'directive', prev: '*' },
      { blankLine: 'never', next: 'singleline-const', prev: 'singleline-const' },
      { blankLine: 'never', next: 'singleline-const', prev: 'singleline-let' },
      { blankLine: 'never', next: 'singleline-let', prev: 'singleline-let' },
      { blankLine: 'never', next: 'singleline-let', prev: 'singleline-const' },
      { blankLine: 'always', next: 'singleline-const', prev: 'cjs-import' },
      { blankLine: 'always', next: 'singleline-let', prev: 'cjs-import' },
      { blankLine: 'always', next: '*', prev: 'multiline-const' },
      { blankLine: 'always', next: 'multiline-const', prev: 'multiline-const' },
      { blankLine: 'always', next: '*', prev: 'multiline-let' },
      { blankLine: 'always', next: 'multiline-const', prev: 'multiline-let' },
      { blankLine: 'never', next: 'cjs-export', prev: 'cjs-export' },
      { blankLine: 'never', next: 'cjs-import', prev: 'cjs-import' },
      { blankLine: 'always', next: 'case', prev: '*' },
      { blankLine: 'always', next: 'default', prev: '*' },
      { blankLine: 'always', next: 'break', prev: '*' },
    ],
    'prettier/prettier': 2,
    'react/jsx-curly-newline': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/jsx-indent': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: false,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],
    'react/jsx-wrap-multilines': [
      2,
      {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore',
        return: 'parens-new-line',
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/sort-comp': 0,
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 2,
    'sort-class-members/sort-class-members': [
      2,
      {
        accessorPairPositioning: 'getThenSet',
        groups: {
          'arrow-function-properties': [
            { propertyType: 'ArrowFunctionExpression', sort: 'alphabetical', type: 'property' },
          ],
          methods: [{ sort: 'alphabetical', type: 'method' }],
          'private-arrow-function-properties': [
            { name: '/_.+/', propertyType: 'ArrowFunctionExpression', type: 'property' },
          ],
          'private-methods': [{ name: '/_.+/', sort: 'alphabetical', type: 'method' }],
          'private-properties': [{ name: '/_.+/', sort: 'alphabetical', type: 'property' }],
          properties: [{ sort: 'alphabetical', type: 'property' }],
          'static-methods': [{ sort: 'alphabetical', static: true, type: 'method' }],
          'static-private-methods': [{ name: '/_.+/', sort: 'alphabetical', static: true, type: 'method' }],
          'static-private-properties': [{ name: '/_.+/', sort: 'alphabetical', static: true, type: 'property' }],
          'static-properties': [{ sort: 'alphabetical', static: true, type: 'property' }],
        },
        order: [
          '[static-properties]',
          '[static-private-properties]',
          '[static-methods]',
          '[static-private-methods]',
          '[arrow-function-properties]',
          '[properties]',
          '[private-arrow-function-properties]',
          '[private-properties]',
          'constructor',
          'getters',
          'setters',
          '[methods]',
          '[private-methods]',
        ],
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: true }],
    'sort-imports': [
      2,
      {
        ignoreDeclarationSort: true,
      },
    ],
    'sort-keys': 0,
    'sort-keys-fix/sort-keys-fix': [2, 'asc', { caseSensitive: true, natural: true }],
    'sort-vars': [2, { ignoreCase: false }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
