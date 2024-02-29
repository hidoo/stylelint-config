/* does not work on stylelint v16 */
export default {
  plugins: ['stylelint-a11y'],
  rules: {
    'a11y/no-display-none': true,
    'a11y/no-obsolete-attribute': true,
    'a11y/no-obsolete-element': true,
    'a11y/no-outline-none': true,
    'a11y/no-text-align-justify': true,
    'a11y/selector-pseudo-class-focus': true
  }
};
