const { decl, rule, atRule } = require('postcss');
const { toEm } = require('@typographist/utils');
const { toKebabCase } = require('./lib/convertors');

// fontSizeProp :: (String | Number) -> Void
exports.createFontSizeProp = (x) =>
  decl({
    prop: 'font-size',
    value: x,
  });

//  mediaQuery :: String -> Object
exports.createMediaQuery = (x) =>
  atRule({
    name: 'media',
    params: `(min-width: ${toEm(x)})`,
  });

// parentSelector :: Object -> Object
exports.createParentSelector = ({ selector }) =>
  rule({
    selector,
  });

// cssVariable :: (String, String) -> Object
exports.createCssVariable = (name, value) =>
  decl({
    prop: `--${toKebabCase(name)}`,
    value,
  });
