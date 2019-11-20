// merge :: {String: a} -> {String: a} -> {String: a}
exports.merge = function() {
  var result = {};

  for (var i = 0; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      result[key] = arguments[i][key];
    }
  }

  return result;
};

// omit :: ([String], {String :: a}) -> {String :: a}
exports.omit = function() {
  var keys = Array.prototype.slice.call(arguments, 0, -1);
  var obj = arguments[arguments.length - 1];

  var result = {};

  for (var key in obj) {
    if (keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }

  return result;
};

// deepObjectValues :: (String, ?a | [a]) -> [a]
exports.deepObjectValues = function deepObjectValues(target, memo) {
  return function(obj) {
    return Object.keys(Object(obj)).reduce(
      (acc, key) => {
        if (key === target) {
          return acc.concat(obj[key]);
        }

        if (obj[key] instanceof Object) {
          return [].concat(deepObjectValues(target, acc)(obj[key]));
        }

        return acc;
      },
      !Array.isArray(memo) ? [] : memo,
    );
  };
};

// invariant :: (a, String) -> Void
exports.invariant = function(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
};

// isNumeric :: a -> Boolean
exports.isNumeric = function(x) {
  return !Number.isNaN(parseFloat(x)) && isFinite(x);
};
