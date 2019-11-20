const { up, down, between, only } = require('../breakpoints/media-queries');

// up :: (Object, Object) -> Void
exports.renderUp = (atrule, breakpointsMap) => {
  atrule.name = 'media';
  atrule.params = up(atrule, breakpointsMap);
};

exports.renderDown = (atrule, breakpointsMap) => {
  atrule.name = 'media';
  atrule.params = down(atrule, breakpointsMap);
};

exports.renderBetween = (atrule, makeBreakpointsMap) => {
  atrule.name = 'media';
  atrule.params = between(atrule, makeBreakpointsMap);
};

exports.renderOnly = (atrule, breakpointsMap) => {
  atrule.name = 'media';
  atrule.params = only(atrule, breakpointsMap);
};
