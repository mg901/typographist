const BROWSER_CONTEXT = 16;

exports.toEm = (x) => parseFloat(x) / BROWSER_CONTEXT + 'em';

exports.toRem = (root) => (fontSize) => parseFloat(fontSize) / root + 'rem';

// percentage :: (String | Number | [String] | [Number])
exports.percentage = (x) => (parseFloat(x) * 100) / BROWSER_CONTEXT + '%';

// invariant :: (a, String) -> Void
exports.invariant = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};
