const assert = require('assert');
const fs = require('fs/promises');
const path = require('path');
const stylelint = require('stylelint');
const config = require('../index.js');

describe('@hidoo/stylint-config', () => {
  let invalidCss = null;

  before(async () => {
    invalidCss = await fs.readFile(
      path.resolve(__dirname, 'fixture', 'invalid.css')
    );
  });

  it('should error all rules in invalid.css.', async () => {
    const rules = [
      'at-rule-semicolon-space-before',
      'alpha-value-notation',
      'color-function-notation',
      'keyframe-block-no-duplicate-selectors',
      'max-line-length',
      'selector-class-pattern',
      'selector-list-comma-space-before',
      'a11y/no-display-none',
      'a11y/no-obsolete-attribute',
      'a11y/no-obsolete-element',
      'a11y/no-outline-none',
      'a11y/no-text-align-justify',
      'a11y/selector-pseudo-class-focus',
      'order/properties-order',
      'plugin/stylelint-group-selectors',
      'plugin/no-low-performance-animation-properties',
      'plugin/no-unsupported-browser-features',
      'plugin/stylelint-selector-no-empty',
      'plugin/selector-tag-no-without-class'
    ];

    const { errored, output } = await stylelint.lint({
      code: invalidCss.toString(),
      config,
      ignoreDisables: true
    });

    assert(errored);

    const values = JSON.parse(output);

    values.forEach((value) => {
      const { deprecations, invalidOptionWarnings, parseErrors, warnings } =
        value;

      assert.deepEqual(deprecations, []);
      assert.deepEqual(invalidOptionWarnings, []);
      assert.deepEqual(parseErrors, []);

      warnings.forEach(({ rule, severity }) => {
        assert(rules.includes(rule));
        assert.equal(severity, 'error');
      });
    });
  });
});
