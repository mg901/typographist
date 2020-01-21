const {
  cleanNode,
  transformAfterNodes,
} = require('@typographist/utils/postcss');

// bubblingRule :: Object -> Void
exports.bubblingRule = (rule) => {
  if (!isBubblingRule(rule)) return;

  cleanNode(rule);
  transformAfterNodes(rule);
  rule.selector = `${rule.parent.selector} ${rule.selector}`;
  const parent = rule.parent.after(rule);
  cleanNode(rule);

  if (!parent.nodes.length) parent.remove();
};

// isBubblingRule :: Object -> Boolean
function isBubblingRule({ parent, selector }) {
  return parent && parent.type === 'rule' && !/&/.test(selector);
}
