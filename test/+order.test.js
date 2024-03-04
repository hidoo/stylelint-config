import assert from 'node:assert';

describe('@hidoo/stylelint-config', () => {
  context('+order.js', () => {
    it('should not use deprecated rules.', async () => {
      const groups = await import('../+order.js').then(
        ({ propertyGroups }) => propertyGroups
      );
      const groupsByCleanOrder = await import(
        'stylelint-config-clean-order'
      ).then(({ propertyGroups }) => propertyGroups);

      assert.deepEqual(groups, groupsByCleanOrder, 'No deprecated rules.');
    });
  });
});
