// merge :: {String: a} -> {String: a} -> {String: a}
exports.merge = function () {
  var i;
  var key;
  var result = {};

  for (i = 0; i < arguments.length; i += 1) {
    for (key in arguments[i]) {
      result[key] = arguments[i][key];
    }
  }

  return result;
};

// omit :: ([String], {String :: a}) -> {String :: a}
exports.omit = function () {
  var key;
  var keys = Array.prototype.slice.call(arguments, 0, -1);
  var obj = arguments[arguments.length - 1];

  var result = {};

  for (key in obj) {
    if (keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }

  return result;
};

// deepObjectValues :: (String, ?a | [a]) -> [a]
exports.deepObjectValues = function deepObjectValues(target, memo) {
  return function (obj) {
    var result = !Array.isArray(memo) ? [] : memo;
    var key;

    for (key in obj) {
      if (key === target) {
        result.push(obj[key]);
      }

      if (obj[key] instanceof Object) {
        deepObjectValues(target, result)(obj[key]);
      }
    }

    return result;
  };
};

// invariant :: (a, String) -> Void
exports.invariant = function (condition, message) {
  if (!condition) {
    throw new Error(message);
  }
};

// isNumeric :: a -> Boolean
exports.isNumeric = function (x) {
  return !Number.isNaN(parseFloat(x)) && isFinite(x);
};

// type :: a -> String
exports.type = function (x) {
  return Object.prototype.toString.call(x).slice(8, -1);
};
