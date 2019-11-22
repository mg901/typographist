const BROWSER_CONTEXT = 16;
const ALL_CHARACTERS_AFTER_COLON = /:.+\b/;
const ALL_PARENTHESES = /[()]/g;
const HAS_PX_OR_EM = /\d+(\.\d+)?(px|em)/;
const HAS_PX = /\d+(\.\d+)?px/;
const HAS_EM = /\d+(\.\d+)?em/;
const DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS = /[-_\s]+(.)?/g;
const SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER = /(?=[A-Z])/;

// getFirstLetter :: String -> String
const getFirstLetter = (word) => word[0].toLowerCase();

// getWordTail :: String -> String
const getWordTail = (word) =>
  word
    .slice(1)
    .replace(DASH_HYPHEN_WHITESPACE_ANY_CHARACTERS, (_, chr) =>
      chr.toUpperCase(),
    );

// camelize :: String -> String
const camelize = (str) => `${getFirstLetter(str)}${getWordTail(str)}`;

// normalizeString :: String -> String
const normalizeString = (x) =>
  x.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

// separateWords :: (Maybe String) -> String -> String
const separateWords = (separator = ' ') => (str) =>
  str
    .split(SEPARATE_STRING_INTO_WORDS_WITH_CAPITAL_LETTER)
    .join(separator)
    .toLowerCase();

// toKebabCase :: String -> String
const toKebabCase = separateWords('-');

// toSnakeCase :: String -> String
const toSnakeCase = separateWords('_');

// hasPx :: String -> Boolean
const hasPx = (x) => HAS_PX.test(x);

// hasEm :: String -> Boolean
const hasEm = (x) => HAS_EM.test(x);

// hasPxOrEm :: String -> Boolean
const hasPxOrEm = (x) => HAS_PX_OR_EM.test(x);

// toPx :: String -> String
const toPx = (x) => `${parseFloat(x) * BROWSER_CONTEXT}px`;

// toEm :: String -> String
const toEm = (x) => `${parseFloat(x) / BROWSER_CONTEXT}em`;

// toEmOrNot :: String -> String
const toEmOrNot = (x) => (hasPx(x) ? toEm(x) : x);

// toPxOrNot :: String -> String
const toPxOrNot = (x) => (hasEm(x) ? toPx(x) : x);

// makeBreakpointName :: String -> String
const makeBreakpointName = (x) =>
  camelize(
    x.replace(ALL_CHARACTERS_AFTER_COLON, '').replace(ALL_PARENTHESES, ''),
  );

// cleanNode :: Object -> Object
const cleanNode = (node) => {
  node.raws = {
    ...(node.raws.between ? { between: node.raws.between } : {}),
    ...{ semicolon: true },
    ...(node.raws.important ? { important: node.raws.important } : {}),
  };

  return node;
};

// transformAfterNodes :: (Object) -> Object | Null
const transformAfterNodes = (node) => {
  const affectedNodes = node.parent.nodes
    .slice(node.parent.nodes.indexOf(node) + 1)
    .map(cleanNode);

  if (affectedNodes.length) {
    const afterParent = cleanNode(node.parent.clone()).removeAll();
    node.parent.after(afterParent);
    afterParent.append(affectedNodes);

    return afterParent;
  }

  return null;
};

exports.camelize = camelize;
exports.cleanNode = cleanNode;
exports.getFirstLetter = getFirstLetter;
exports.getWordTail = getWordTail;
exports.hasPx = hasPx;
exports.hasEm = hasEm;
exports.hasPxOrEm = hasPxOrEm;
exports.makeBreakpointName = makeBreakpointName;
exports.normalizeString = normalizeString;
exports.toEm = toEm;
exports.toEmOrNot = toEmOrNot;
exports.toKebabCase = toKebabCase;
exports.toPx = toPx;
exports.toPxOrNot = toPxOrNot;
exports.toSnakeCase = toSnakeCase;
exports.transformAfterNodes = transformAfterNodes;
