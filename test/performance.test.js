import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import findRules from './lib/findRules.js';
import runLint from './lib/runLint.js';

describe('performance', () => {
  let dirname = null;
  let fixturesDir = null;
  let configFile = null;
  let config = null;

  before(async () => {
    dirname = fileURLToPath(new URL('.', import.meta.url));
    fixturesDir = path.resolve(dirname, 'fixture');
    configFile = path.resolve(dirname, '..', 'src', 'performance.js');
    config = await import(configFile).then((module) => module.default);
  });

  it('should not use deprecated rules.', async () => {
    const deprecated = await findRules(configFile, 'deprecated', {
      filterPrefix: /^\/plugin\//
    });

    assert.deepEqual(deprecated, [], 'No deprecated rules.');
  });

  it('should not use invalid rules.', async () => {
    const invalid = await findRules(configFile, 'invalid', {
      filterPrefix: /^\/plugin\//
    });

    assert.deepEqual(invalid, [], 'No invalid rules.');
  });

  it('should not be unused rules.', async () => {
    const unused = await findRules(configFile, 'unused', {
      filterPrefix: /^\/plugin\//
    });

    assert.deepEqual(unused, [], 'No unused rules.');
  });

  it('should have no errors and no warnings in performance.valid.css', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, 'performance.valid.css')
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

  it('should have errors and warnings in performance.invalid.css', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, 'performance.invalid.css')
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
        ['plugin/no-low-performance-animation-properties'],
        'Some errors.'
      );
      assert.deepEqual(warnings, [], 'No warnings.');
    });
  });
});
