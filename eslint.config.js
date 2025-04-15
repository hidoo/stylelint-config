import configs from '@hidoo/eslint-config';
import prettierConfig from '@hidoo/eslint-config/+prettier';
import nodeConfig from '@hidoo/eslint-config/+node';
import mochaConfig from '@hidoo/eslint-config/+mocha';

export default [
  ...configs,
  prettierConfig,
  nodeConfig,
  {
    rules: {
      'import/no-anonymous-default-export': 'off',
      'n/file-extension-in-import': ['error', 'always']
    }
  },
  {
    files: ['src/**/*.js'],
    rules: {
      'no-magic-numbers': 'off'
    }
  },
  {
    files: ['**/*.test.js'],
    ...mochaConfig
  }
];
