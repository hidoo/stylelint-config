import assert from 'node:assert';
import { createRequire } from 'node:module';

describe('@hidoo/stylelint-config', () => {
  let require = null;

  before(() => {
    require = createRequire(import.meta.url);
  });

  context('+compatibility', () => {
    it('should be importable.', () => {
      assert(require.resolve('@hidoo/stylelint-config/+compatibility'));
    });
  });

  context('+order', () => {
    it('should be importable.', () => {
      assert(require.resolve('@hidoo/stylelint-config/+order'));
    });

    context('propertyGroups', () => {
      it('should be importable as named import.', async () => {
        const groups = await import('../+order.js').then(
          ({ propertyGroups }) => propertyGroups
        );
        const groupsByCleanOrder = await import(
          'stylelint-config-clean-order'
        ).then(({ propertyGroups }) => propertyGroups);

        assert.deepEqual(
          groups,
          groupsByCleanOrder,
          'Same as propertyGroups of stylelint-config-clean-order.'
        );
      });
    });
  });

  context('+performance', () => {
    it('should be importable.', () => {
      assert(require.resolve('@hidoo/stylelint-config/+performance'));
    });
  });

  context('+scss', () => {
    it('should be importable.', () => {
      assert(require.resolve('@hidoo/stylelint-config/+scss'));
    });
  });
});
