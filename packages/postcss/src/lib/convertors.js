const { BROWSER_CONTEXT } = require('./constants');

// getFirstLetter :: String -> String
const getFirstLetter = (word) => word[0].toLowerCase();

// getWordTail :: String -> String
const getWordTail = (word) =>
  word.slice(1).replace(/[-_\s]+(.)?/g, (_, chr) => chr.toUpperCase());

// camelize :: String -> String
const camelize = (str) => `${getFirstLetter(str)}${getWordTail(str)}`;

// normalizeString :: String -> String
const normalizeString = (x) =>
  x.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

// separateWords :: (Maybe String) -> String -> String
const separateWords = (separator = ' ') => (str) =>
  str
    .split(/(?=[A-Z])/)
    .join(separator)
    .toLowerCase();

// toKebabCase :: String -> String
const toKebabCase = separateWords('-');

// toSnakeCase :: String -> String
const toSnakeCase = separateWords('_');

// toPx :: String -> String
const toPx = (x) => `${parseFloat(x) * BROWSER_CONTEXT}px`;

// toEm :: String -> String
const toEm = (x) => `${parseFloat(x) / BROWSER_CONTEXT}em`;

// toEmOrNot :: String -> String
const toEmOrNot = (x) => (x.includes('px') ? toEm(x) : x);

// toPxOrNot :: String -> String
const toPxOrNot = (x) => (x.includes('em') ? toPx(x) : x);

module.exports = {
  toPx,
  toEm,
  toEmOrNot,
  toPxOrNot,
  camelize,
  normalizeString,
  toKebabCase,
  toSnakeCase,
};
