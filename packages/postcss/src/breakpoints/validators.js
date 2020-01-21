const { camelize } = require('../lib/convertors');
const { hasPxOrEm } = require('../lib/validators');
const {
  getOrientation,
  getBreakpointValues,
  createBreakpointList,
  getCurrentIndex,
  getlastBreakIndex,
} = require('./utils');

// throwInvalidOrientation :: Object -> Void
exports.throwInvalidOrientation = (atrule) => {
  const orientation = getOrientation(atrule.params);
  const isValid = /portrait|landscape/.test(orientation) || orientation === '';

  if (!isValid) {
    throw atrule.error(
      `'${orientation}' is invalid orientation. Use 'portrait' or 'landscape'. Example: @up(tablet):portrait.`,
    );
  }
};

// throwInvalidBreakpointValue ::  (Object, Object) -> Void
exports.throwInvalidBreakpointValue = (breakpoints, atrule) => {
  getBreakpointValues(atrule.params).forEach((param) => {
    if (/[A-Z]/.test(param)) {
      throw atrule.error(
        `'${param}' is invalid breakpoint name. Set the name to lowercase, use kebab case notation. Example: 'desktop' or 'lg-desktop'.`,
      );
    }

    const isValidValue = !!breakpoints[camelize(param)] || hasPxOrEm(param);

    if (!isValidValue) {
      throw atrule.error(
        `'${param}' is invalid breakpoint name. Use '${createBreakpointList(
          breakpoints,
        )}' or values with pixels or ems. Example: @up(tablet) or @up(1200px) or @up(60em).`,
      );
    }
  });
};

// throwLastBreakpoint :: (Object, Object) -> Void
exports.throwLastBreakpoint = (breakpoints, atrule) => {
  const breakpointName = getBreakpointValues(atrule.params);
  const currentIndex = getCurrentIndex(breakpointName, breakpoints);
  const lastBreakIndex = getlastBreakIndex(breakpoints);

  if (currentIndex === lastBreakIndex) {
    throw atrule.error(
      `Don't use '${breakpointName}' because it doesn't have a maximum width.`,
    );
  }
};

exports.throwLessThanTwoArgs = ({ params }) => {
  const args = getBreakpointValues(params).length;

  if (args < 2) {
    throw new Error(
      `'@between' must have two arguments. The first is the minimum breakpoint, the second is the maximum break point.'`,
    );
  }
};
