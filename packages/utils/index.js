const BROWSER_CONTEXT = 16;

function toEm(x) {
  return parseFloat(x) / BROWSER_CONTEXT + 'em';
}

function toRem(root, fontSize) {
  return parseFloat(fontSize) / root + 'rem';
}

function percentage(x) {
  return (parseFloat(x) * 100) / BROWSER_CONTEXT + '%';
}

// invariant :: (a, String) -> Void
function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

exports.invariant = invariant;
exports.percentage = percentage;
exports.toEm = toEm;
exports.toRem = toRem;
