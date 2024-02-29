/**
 * selector pattern
 *
 * @type {String}
 */
const selectorPattern = '^([a-z][a-z0-9]*)((-|__|--)[a-z0-9]+)*$';

export default {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-group-selectors',
    'stylelint-selector-no-empty',
    'stylelint-selector-tag-no-without-class'
  ],
  rules: {
    'alpha-value-notation': 'number',
    'at-rule-allowed-list': null,
    'at-rule-disallowed-list': null,
    'at-rule-property-required-list': null,
    'color-function-notation': ['legacy', { ignore: ['with-var-inside'] }],
    'color-hex-alpha': 'never',
    'color-named': null,
    'color-no-hex': null,
    'comment-pattern': null,
    'comment-word-disallowed-list': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-no-important': [true, { severity: 'warning' }],
    'declaration-property-max-values': null,
    'declaration-property-unit-allowed-list': null,
    'declaration-property-unit-disallowed-list': null,
    'declaration-property-value-allowed-list': null,
    'declaration-property-value-disallowed-list': null,
    'declaration-property-value-no-unknown': null,
    'font-weight-notation': null,
    'function-allowed-list': null,
    'function-disallowed-list': null,
    'function-url-no-scheme-relative': true,
    'function-url-scheme-allowed-list': ['data', '/^http/'],
    'function-url-scheme-disallowed-list': null,
    'hue-degree-notation': null,
    'max-nesting-depth': [3, { ignore: ['blockless-at-rules'] }],
    'media-feature-name-allowed-list': null,
    'media-feature-name-disallowed-list': null,
    'media-feature-name-unit-allowed-list': null,
    'media-feature-name-value-allowed-list': null,
    'media-feature-name-value-no-unknown': true,
    'media-feature-range-notation': null,
    'no-unknown-animations': true,
    'no-unknown-custom-properties': true,
    'keyframe-block-no-duplicate-selectors': true,
    'property-allowed-list': null,
    'property-disallowed-list': null,
    'property-no-unknown': [
      true,
      {
        checkPrefixed: true
      }
    ],
    'rule-selector-property-disallowed-list': null,
    'selector-attribute-name-disallowed-list': null,
    'selector-attribute-operator-allowed-list': null,
    'selector-attribute-operator-disallowed-list': null,
    'selector-class-pattern': [
      selectorPattern,
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be kebab-case (includes BEM)`,
        resolveNestedSelectors: true
      }
    ],
    'selector-combinator-allowed-list': null,
    'selector-combinator-disallowed-list': null,
    'selector-disallowed-list': null,
    'selector-id-pattern': [
      selectorPattern,
      {
        message: (selector) =>
          `Expected id selector "${selector}" to be kebab-case (includes BEM)`
      }
    ],
    'selector-max-attribute': [3, { severity: 'warning' }],
    'selector-max-class': [3, { severity: 'warning' }],
    'selector-max-combinators': null,
    'selector-max-compound-selectors': null,
    'selector-max-id': [1, { severity: 'warning' }],
    'selector-max-pseudo-class': [3, { severity: 'warning' }],
    'selector-max-specificity': [
      '1,3,0',
      {
        severity: 'warning'
      }
    ],
    'selector-max-type': null,
    'selector-max-universal': [1, { severity: 'warning' }],
    'selector-nested-pattern': null,
    'selector-no-qualifying-type': null,
    'selector-pseudo-class-allowed-list': null,
    'selector-pseudo-class-disallowed-list': null,
    'selector-pseudo-element-allowed-list': null,
    'selector-pseudo-element-disallowed-list': null,
    'time-min-milliseconds': null,
    'unit-allowed-list': null,
    'unit-disallowed-list': null,

    // plugin/stylelint-declaration-block-no-ignored-properties
    'plugin/declaration-block-no-ignored-properties': true,

    // plugin/stylelint-group-selectors
    'plugin/stylelint-group-selectors': true,

    // plugin/stylelint-selector-no-empty
    'plugin/stylelint-selector-no-empty': true,

    // plugin/selector-tag-no-without-class
    'plugin/selector-tag-no-without-class': ['div', 'span']
  }
};
