import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import findRules from './lib/findRules.js';
import runLint from './lib/runLint.js';

describe('scss', () => {
  let dirname = null;
  let fixturesDir = null;
  let configFile = null;
  let config = null;

  before(async () => {
    dirname = fileURLToPath(new URL('.', import.meta.url));
    fixturesDir = path.resolve(dirname, 'fixture');
    configFile = path.resolve(dirname, '..', 'src', 'scss.js');
    config = await import(configFile).then((module) => module.default);
  });

  it('should not use deprecated rules.', async () => {
    const deprecated = await findRules(configFile, 'deprecated', {
      filterPrefix: /^scss\//
    });

    assert.deepEqual(deprecated, [], 'No deprecated rules.');
  });

  it('should not use invalid rules.', async () => {
    const invalid = await findRules(configFile, 'invalid', {
      filterPrefix: /^scss\//
    });

    assert.deepEqual(invalid, [], 'No invalid rules.');
  });

  it('should not be unused rules.', async () => {
    const unused = await findRules(configFile, 'unused', {
      filterPrefix: /^scss\//
    });

    assert.deepEqual(unused, [], 'No unused rules.');
  });

  it('should have no errors and no warnings in _valid.scss', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, '_valid.scss')
    );

    reports.forEach((report) => {
      const errors = [
        ...new Set(
          report.warnings
            .filter(({ severity }) => severity === 'error')
            .map(({ rule }) => rule)
            .sort()
        )
      ];
      const warnings = [
        ...new Set(
          report.warnings
            .filter(({ severity }) => severity === 'warning')
            .map(({ rule }) => rule)
            .sort()
        )
      ];

      assert.deepEqual(errors, [], 'No errors.');
      assert.deepEqual(warnings, [], 'No warnings.');
    });
  });

  it('should have errors and warnings in _invalid.scss', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, '_invalid.scss')
    );

    reports.forEach((report) => {
      const errors = [
        ...new Set(
          report.warnings
            .filter(({ severity }) => severity === 'error')
            .map(({ rule }) => rule)
            .sort()
        )
      ];
      const warnings = [
        ...new Set(
          report.warnings
            .filter(({ severity }) => severity === 'warning')
            .map(({ rule }) => rule)
            .sort()
        )
      ];

      assert.deepEqual(
        errors,
        [
          'scss/at-each-key-value-single-line',
          'scss/at-function-named-arguments',
          'scss/at-function-pattern',
          'scss/at-import-partial-extension-whitelist',
          'scss/at-mixin-argumentless-call-parentheses',
          'scss/at-mixin-named-arguments',
          'scss/at-mixin-pattern',
          'scss/at-root-no-redundant',
          'scss/at-use-no-redundant-alias',
          'scss/at-use-no-unnamespaced',
          'scss/declaration-nested-properties',
          'scss/dimension-no-non-numeric-values',
          'scss/dollar-variable-default',
          'scss/dollar-variable-empty-line-after',
          'scss/dollar-variable-first-in-block',
          'scss/dollar-variable-no-namespaced-assignment',
          'scss/dollar-variable-pattern',
          'scss/double-slash-comment-inline',
          'scss/function-color-relative',
          'scss/map-keys-quotes',
          'scss/no-unused-private-members',
          'scss/partial-no-import',
          'scss/percent-placeholder-pattern',
          'scss/property-no-unknown',
          'scss/selector-nest-combinators',
          'scss/selector-no-redundant-nesting-selector'
        ],
        'Some errors.'
      );
      assert.deepEqual(
        warnings,
        ['scss/no-duplicate-dollar-variables'],
        'Some warnings.'
      );
    });
  });
});
