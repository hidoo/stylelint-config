import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import findRules from './lib/findRules.js';
import runLint from './lib/runLint.js';

describe('base', () => {
  let dirname = null;
  let fixturesDir = null;
  let configFile = null;
  let config = null;

  before(async () => {
    dirname = fileURLToPath(new URL('.', import.meta.url));
    fixturesDir = path.resolve(dirname, 'fixture');
    configFile = path.resolve(dirname, '..', 'src', 'base.js');
    config = await import(configFile).then((module) => module.default);
  });

  it('should not use deprecated rules.', async () => {
    const deprecated = await findRules(configFile, 'deprecated');

    assert.deepEqual(deprecated, [], 'No deprecated rules.');
  });

  it('should not use invalid rules.', async () => {
    const invalid = await findRules(configFile, 'invalid');

    assert.deepEqual(invalid, [], 'No invalid rules.');
  });

  it('should not be unused rules.', async () => {
    const unused = await findRules(configFile, 'unused');

    assert.deepEqual(unused, [], 'No unused rules.');
  });

  it('should have no errors and no warnings in base.valid.css', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, 'base.valid.css')
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

  it('should have some errors and warnings in invalid.css.', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, 'base.invalid.css')
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
          'alpha-value-notation',
          'color-function-notation',
          'color-hex-alpha',
          'function-url-no-scheme-relative',
          'function-url-scheme-allowed-list',
          'max-nesting-depth',
          'media-feature-name-value-no-unknown',
          'no-unknown-animations',
          'property-no-unknown',
          'selector-class-pattern',
          'selector-id-pattern',
          'value-keyword-case',
          'csstools/value-no-unknown-custom-properties',
          'plugin/declaration-block-no-ignored-properties',
          'plugin/stylelint-group-selectors',
          'plugin/stylelint-selector-no-empty',
          'plugin/selector-tag-no-without-class'
        ].sort(),
        'Some errors.'
      );
      assert.deepEqual(
        warnings,
        [
          'declaration-no-important',
          'selector-max-attribute',
          'selector-max-class',
          'selector-max-id',
          'selector-max-pseudo-class',
          'selector-max-specificity',
          'selector-max-type',
          'selector-max-universal'
        ].sort(),
        'Some warnings.'
      );
    });
  });
});
