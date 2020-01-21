const {
  cleanNode,
  transformAfterNodes,
} = require('@typographist/utils/postcss');

// nestedRule :: Object -> Void
exports.nestedRule = (rule) => {
  if (!isNestedRule(rule)) return;

  cleanNode(rule);
  transformAfterNodes(rule);
  rule.nodes.map(cleanNode);
  const selectorName = createNestedSelectorNames(rule);

  rule.selector = replaceLastComma(selectorName);
  rule.parent.selector = replaceLastComma(rule.parent.selector);

  rule.parent.after(rule);
  cleanNode(rule);

  if (!rule.nodes.length) {
    rule.remove();
  }
};

// isNestedRule :: Object -> Boolean
function isNestedRule({ parent, selector }) {
  return parent && parent.type === 'rule' && /&/.test(selector);
}

// createNestedSelectorNames :: Object -> String
function createNestedSelectorNames(rule) {
  const parentSelectors = getRawRules(rule.parent.selector);
  const nestedSelectors = getRawRules(rule.selector);
  const commaAndNewLine = ',\n';

  let selectorName = '';
  for (let i = 0; i < parentSelectors.length; i += 1) {
    for (let j = 0; j < nestedSelectors.length; j += 1) {
      selectorName +=
        createSelectorName(nestedSelectors[j], parentSelectors[i]) +
        commaAndNewLine;
    }
  }

  return selectorName;
}

// createSelectorName :: (String, String) -> String
function createSelectorName(replaceable, replacer) {
  return replaceable.replace(/&/, replacer);
}

// getRawRules :: String -> [String]
function getRawRules(rule) {
  const lastComma = /,\s*$/;
  const lineBreaksAndSpaces = /[\n\s]/g;

  return rule
    .replace(lastComma, '')
    .replace(lineBreaksAndSpaces, '')
    .split(',');
}

// replaceLastComma :: String -> String
function replaceLastComma(selector) {
  const lastComma = /,\s*$/;

  return selector.replace(lastComma, '');
}
