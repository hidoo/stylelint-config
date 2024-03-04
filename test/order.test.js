import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import findRules from './lib/findRules.js';
import runLint from './lib/runLint.js';

describe('order', () => {
  let dirname = null;
  let fixturesDir = null;
  let configFile = null;
  let config = null;

  before(async () => {
    dirname = fileURLToPath(new URL('.', import.meta.url));
    fixturesDir = path.resolve(dirname, 'fixture');
    configFile = path.resolve(dirname, '..', 'src', 'order.js');
    config = await import(configFile).then((module) => module.default);
  });

  it('should not use deprecated rules.', async () => {
    const deprecated = await findRules(configFile, 'deprecated', {
      filterPrefix: /^\/order\//
    });

    assert.deepEqual(deprecated, [], 'No deprecated rules.');
  });

  it('should not use invalid rules.', async () => {
    const invalid = await findRules(configFile, 'invalid', {
      filterPrefix: /^\/order\//
    });

    assert.deepEqual(invalid, [], 'No invalid rules.');
  });

  it('should not be unused rules.', async () => {
    const unused = await findRules(configFile, 'unused', {
      filterPrefix: /^\/order\//
    });

    assert.deepEqual(unused, [], 'No unused rules.');
  });

  it('should have no errors and no warnings in order.valid.css', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, 'order.valid.css')
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

  it('should have errors and warnings in order.invalid.css', async () => {
    const reports = await runLint(
      config,
      path.resolve(fixturesDir, 'order.invalid.css')
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
      assert.deepEqual(
        warnings,
        ['order/order', 'order/properties-order'],
        'Some warnings.'
      );
    });
  });
});
