import plugin from 'stylelint-scss';
import configPrettier from 'stylelint-config-prettier-scss';
import configRecommended from 'stylelint-config-recommended-scss';
import configStandard from 'stylelint-config-standard-scss';

/**
 * identifier pattern
 *
 * @type {String}
 */
const identifierPattern = '^([-_]?[a-z][a-z0-9]*)(-[a-z0-9]+)*$';

export default {
  customSyntax: configRecommended.customSyntax,
  plugins: [plugin],
  rules: {
    ...configRecommended.rules,
    ...configStandard.rules,

    // overrides stylelint rules
    'media-feature-name-value-no-unknown': null,
    'no-invalid-double-slash-comments': null,
    'property-no-unknown': null,

    // stylelint-scss rules
    'scss/at-each-key-value-single-line': true,
    'scss/at-function-named-arguments': [
      'never',
      {
        ignoreFunctions: [
          'color.adjust',
          'color.change',
          'color.scale',
          'list.append',
          'list.join',
          'meta.function-exists',
          'meta.get-function',
          'meta.mixin-exists',
          'meta.get-mixin',
          'meta.global-variable-exists',
          'string.split'
        ]
      }
    ],
    'scss/at-function-pattern': [
      identifierPattern,
      {
        message:
          'Expected function name to be kebab-case (Allow private members start with underscore)'
      }
    ],
    'scss/at-import-partial-extension-blacklist': null,
    'scss/at-import-partial-extension-whitelist': ['less', 'sass', 'styl'],
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-named-arguments': [
      'always',
      {
        ignore: ['single-argument']
      }
    ],
    'scss/at-mixin-pattern': [
      identifierPattern,
      {
        message:
          'Expected mixin name to be kebab-case (Allow private members start with underscore)'
      }
    ],
    'scss/at-root-no-redundant': true,
    'scss/at-use-no-redundant-alias': true,
    'scss/at-use-no-unnamespaced': true,
    'scss/block-no-redundant-nesting': null,
    'scss/comment-no-loud': null,
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-colon-newline-after': 'always-multi-line',
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-default': [
      true,
      {
        ignore: 'local'
      }
    ],
    'scss/dollar-variable-empty-line-after': [
      'always',
      {
        except: ['before-dollar-variable', 'last-nested'],
        ignore: ['inside-single-line-block']
      }
    ],
    'scss/dollar-variable-first-in-block': [
      true,
      {
        except: ['root', 'at-rule', 'function', 'mixin', 'if-else', 'loops'],
        ignore: ['comments', 'imports']
      }
    ],
    'scss/dollar-variable-no-namespaced-assignment': true,
    'scss/dollar-variable-pattern': [
      identifierPattern,
      {
        message:
          'Expected variable to be kebab-case (Allow private members start with underscore)'
      }
    ],
    'scss/double-slash-comment-inline': [
      'never',
      {
        ignore: ['stylelint-commands']
      }
    ],
    'scss/function-calculation-no-interpolation': null,
    'scss/function-color-relative': true,
    'scss/function-disallowed-list': null,
    'scss/function-no-unknown': null,
    'scss/map-keys-quotes': 'always',
    'scss/media-feature-value-dollar-variable': null,
    'scss/no-dollar-variables': null,
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInside: ['at-rule'],
        ignoreInsideAtRules: ['if', 'while'],
        severity: 'warning'
      }
    ],
    'scss/no-unused-private-members': true,
    'scss/partial-no-import': true,
    'scss/percent-placeholder-pattern': [
      identifierPattern,
      {
        message:
          'Expected placeholder to be kebab-case (Allow private members start with underscore)'
      }
    ],
    'scss/property-no-unknown': [
      true,
      {
        ignoreAtRules: ['supports'],
        checkPrefixed: true
      }
    ],
    'scss/selector-nest-combinators': 'always',
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/selector-no-union-class-name': null,

    // Disabled stylistic rules to avoid conflict with prettier
    ...configPrettier.rules
  }
};
