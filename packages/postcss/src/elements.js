const { decl, rule, atRule } = require('postcss');
const { toEm } = require('@typographist/utils');
const { toKebabCase } = require('@typographist/utils/postcss');

// fontSizeProp :: (String | Number) -> Void
exports.fontSizeProp = (x) =>
  decl({
    prop: 'font-size',
    value: x,
  });

//  mediaQuery :: String -> Object
exports.mediaQuery = (x) =>
  atRule({
    name: 'media ',
    params: `(min-width: ${toEm(x)})`,
  });

// makeRootProp :: Object -> Object
exports.makeRootProp = ({ selector }) =>
  rule({
    selector,
  });

// cssVariable :: (String, String) -> Object
exports.cssVariable = (name, value) =>
  decl({
    prop: `--${toKebabCase(name)}`,
    value,
  });
