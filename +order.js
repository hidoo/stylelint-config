import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
  extends: [
    path.resolve(fileURLToPath(new URL('src', import.meta.url)), 'order.js')
  ]
};
