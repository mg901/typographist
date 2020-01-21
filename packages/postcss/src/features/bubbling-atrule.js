const { cleanNode, transformAfterNodes } = require('../lib/postcss');

exports.bubblingAtrule = (atrule) => {
  if (!isBubblingAtrule(atrule)) return;

  cleanNode(atrule);
  transformAfterNodes(atrule);
  const parentClone = atrule.parent.clone();
  const innerNodes = atrule.nodes.map(cleanNode);

  atrule.prepend(cleanNode(parentClone).removeAll());

  cleanNode(parentClone)
    .removeAll()
    .append(innerNodes);

  const parent = atrule.parent.after(atrule);
  cleanNode(atrule);

  if (!parent.nodes.length) parent.remove();
};

function isBubblingAtrule({ parent, name }) {
  return (
    /^(up|down|only|between)$/.test(name) && parent && parent.type === 'rule'
  );
}
