const {
  deepObjectValues,
  invariant,
  merge,
  omit,
  isNumeric,
  type,
} = require('../src/library');

describe('merge', () => {
  it('merge all transferred objects', () => {
    expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe('omit', () => {
  it('return object without a  parameter passed', () => {
    expect(omit('a', { a: 1, b: 2 })).toEqual({ b: 2 });
  });
});

describe('deepObjectValues', () => {
  it('return an array of a values from the object', () => {
    const config = {
      aa: 1,
      bb: 2,
      cc: {
        d: {
          x: 9,
        },
      },
      dd: {
        d: {
          y: 9,
        },
      },
    };

    expect(deepObjectValues('d')(config)).toEqual([{ x: 9 }, { y: 9 }]);
  });
});

describe('invariant', () => {
  it('return object Error with error message', () => {
    expect(invariant).toThrow();
  });
});

describe('isNumeric', () => {
  it('return `true` if the number', () => {
    expect(isNumeric(14.88)).toBe(true);
  });

  it('return `true` if the string contains number', () => {
    expect(isNumeric('111')).toBe(true);
  });

  it('return `true` if string contains number with units', () => {
    expect(isNumeric('56.78px')).toBe(false);
  });

  it('return `false` if is not a number', () => {
    expect(isNumeric(NaN)).toBe(false);
  });

  it('return `true` if is the boolean', () => {
    expect(isNumeric(false)).toBe(false);
  });

  it('return `true` if is Infinity number', () => {
    expect(isNumeric(Infinity)).toBe(false);
  });
});

describe('type', () => {
  it('return Function type', () => {
    expect(type(console.log)).toEqual('Function');
  });

  it('return Object type', () => {
    expect(type({})).toEqual('Object');
  });

  it('return Array type', () => {
    expect(type([])).toEqual('Array');
  });

  it('return Number type', () => {
    expect(type(1)).toEqual('Number');
    expect(type(Infinity)).toEqual('Number');
    expect(type(-Infinity)).toEqual('Number');
  });

  it('return String type', () => {
    expect(type('')).toEqual('String');
  });

  it('return Boolean type', () => {
    expect(type(true)).toEqual('Boolean');
  });

  it('return Null type', () => {
    expect(type(null)).toEqual('Null');
  });
});
