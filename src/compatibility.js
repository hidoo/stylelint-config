export default {
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['text-size-adjust'],
        severity: 'warning'
      }
    ]
  }
};
