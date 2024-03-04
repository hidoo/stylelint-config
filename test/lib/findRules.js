// eslint-disable-next-line import/no-unresolved
import stylelintRules from 'stylelint-find-new-rules';

/**
 * default options
 *
 * @type {Object}
 */
const defaultOptions = {
  filterPrefix: ''
};

/**
 * find rules by type
 *
 * @param {String} configFile file path of config
 * @param {String} type type of rules
 * @param {Object} options options
 * @param {String|RegExp} options.filterPrefix filter prefix
 * @return {Promise<Array>} list of ruleIds
 */
export default async function findRules(configFile, type, options = {}) {
  const rules = await stylelintRules(configFile);

  if (!rules[type]) {
    throw new TypeError(`Argument #2 type "${type}" is not supported.`);
  }

  const { filterPrefix } = {
    ...defaultOptions,
    ...options
  };

  if (filterPrefix instanceof RegExp) {
    return rules[type].filter(({ name }) => name.match(filterPrefix) !== null);
  } else if (typeof filterPrefix === 'string' && filterPrefix !== '') {
    // eslint-disable-next-line no-magic-numbers
    return rules[type].filter(({ name }) => name.indexOf(filterPrefix) === 0);
  }
  return rules[type];
}
