const BROWSER_CONTEXT = 16;

// toEm :: (String) -> String
exports.toEm = (x) => parseFloat(x) / BROWSER_CONTEXT + 'em';

// toRem :: (Number, Number | [Number]) -> String
exports.toRem = (root, fontSize) =>
  parseFloat(String(fontSize)) / parseFloat(root) + 'rem';

// percentage :: (String | Number | [String] | [Number])
exports.percentage = (x) =>
  (parseFloat(String(x)) * 100) / BROWSER_CONTEXT + '%';

// invariant :: (a, String) -> Void
exports.invariant = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};
