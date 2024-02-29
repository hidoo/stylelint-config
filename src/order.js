/**
 * properties order settings
 *
 * @type {Object}
 */
const order = {
  sizes: ['min', 'max'],
  directions: ['top', 'right', 'bottom', 'left']
};

export default {
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      'dollar-variables',
      'custom-properties',
      'declarations',
      'rules'
    ],
    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      [
        'content',
        'display',
        'visibility',
        'overflow',
        'box-sizing',
        'table-layout',
        'position',
        'z-index',
        order.directions,
        'flex-basis',
        'flex-direction',
        'flex-grow',
        'flex-shrink',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-content',
        'float',
        'clear',
        'width',
        order.sizes.map((size) => `${size}-width`),
        'height',
        order.sizes.map((size) => `${size}-height`),
        'margin',
        order.directions.map((direction) => `margin-${direction}`),
        'padding',
        order.directions.map((direction) => `padding-${direction}`),
        'list-style',
        'letter-spacing',
        'line-height',
        'text-align',
        'text-decoration',
        'text-indent',
        'vertical-align',
        'white-space',
        'word-break',
        'word-wrap',
        'color',
        'background',
        'background-attachment',
        'background-color',
        'background-image',
        'background-position',
        'background-size',
        'background-repeat',
        'border',
        'border-collapse',
        'border-color',
        order.directions.map((direction) => `border-${direction}-color`),
        'border-style',
        order.directions.map((direction) => `border-${direction}-style`),
        'border-radius',
        'border-width',
        order.directions.map((direction) => `border-${direction}-width`),
        'font',
        'font-family',
        'font-feature-settings',
        'font-size',
        'font-style',
        'font-weight',
        'counter-reset',
        'counter-increment',
        'appearance',
        'box-shadow',
        'cursor',
        'opacity',
        'transform-origin',
        'transform',
        'transition-duration',
        'transition-property',
        'transition-timing-function'
      ].flat(),
      {
        unspecified: 'ignore'
      }
    ]
  }
};
