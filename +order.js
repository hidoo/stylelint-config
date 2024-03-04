import path from 'node:path';
import { fileURLToPath } from 'node:url';

export { propertyGroups } from 'stylelint-config-clean-order';

export default {
  extends: [
    path.resolve(fileURLToPath(new URL('src', import.meta.url)), 'order.js')
  ]
};
