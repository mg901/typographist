const { toEm, toRem, percentage, invariant } = require('.');

describe('utils: ', () => {
  describe('toEm', () => {
    it('should convert pixels to ems', () => {
      expect(toEm('16px')).toBe('1em');
    });
  });

  describe('toRem', () => {
    it('should convert pixels to rems', () => {
      expect(toRem('16', '16px')).toBe('1rem');
      expect(toRem('16px', '16px')).toBe('1rem');
    });
  });

  describe('percentage', () => {
    it('should convert pixels to percent', () => {
      expect(percentage('16px')).toBe('100%');
      expect(percentage('16')).toBe('100%');
      expect(percentage(['16'])).toBe('100%');
      expect(percentage([16])).toBe('100%');
    });
  });

  describe('invariant', () => {
    it('should throw error', () => {
      expect(invariant).toThrow();
    });
  });
});
