import stylelint from 'stylelint';

/**
 * run lint and return reports as an array
 *
 * @param {import('stylelint').Config} config config object
 * @param {String|Array<String>} files file globs
 * @param {Object} options options
 * @return {Promise<Array>}
 */
export default async function runLint(config, files, options = {}) {
  const result = await stylelint.lint({
    config,
    files,
    ignoreDisables: false,
    ...options
  });

  return JSON.parse(result.report);
}
