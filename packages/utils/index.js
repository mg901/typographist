const BROWSER_CONTEXT = 16;

function toEm(x) {
  return parseFloat(x) / BROWSER_CONTEXT + 'em';
}

function toRem(root, fontSize) {
  return Number(fontSize) / root + 'rem';
}

function percentage(x) {
  return (Number(x) / BROWSER_CONTEXT) * 100 + '%';
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
