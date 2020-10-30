const { decl } = require('postcss');
const { percentage } = require('@typographist/utils');
const {
  createMediaQuery,
  createFontSizeProp,
  createParentSelector,
} = require('../elements');
const { toKebabCase } = require('../lib/convertors');

// renderStandardRoot :: (Object, Object) -> Void
exports.renderStandardRoot = (atrule, breakpointsMap) => {
  if (atrule.params !== '') return;

  renderStandardRoot(atrule, breakpointsMap);
};

// renderStandardRoot :: (Object, Object) -> Void
function renderStandardRoot(atrule, breakpointsMap) {
  const { initial, ...breaks } = breakpointsMap;

  addFontSizesForEachBreaks(atrule, breaks);
  addCssVariables(atrule, breaks);
  const fontSize = percentage(initial.root);
  atrule.replaceWith(createFontSizeProp(fontSize));
}

// addFontSizesForEachBreaks :: (Object, [Object]) -> Void
function addFontSizesForEachBreaks(atrule, breaks) {
  Object.values(breaks)
    .reverse()
    .forEach(({ root, minWidth }) => {
      const fontSize = createFontSizeProp(percentage(root));

      atrule.parent.after(
        createMediaQuery(minWidth).append(
          createParentSelector(atrule.parent).append(fontSize),
        ),
      );
    });
}

// throwIsNotRootSelector :: Object -> Void
exports.throwIsNotRootSelector = function (atrule) {
  if (!isValidRootSelector(atrule)) {
    throw atrule.error(
      `Use the '${atrule}' with the ':root' or 'html' selectors.`,
    );
  }
};

// isValidRootSelector :: Object -> Boolean
function isValidRootSelector(atrule) {
  const { selector } = atrule.parent;

  return (atrule.parent && selector === ':root') || selector === 'html';
}

// FLUID ROOT ---------------------------------------------------------
// renderFluidRoot :: (Object, Object) -> Void
// exports.renderFluidRoot = function(atrule, breakpointsMap) {
//   if (atrule.params.length === 0) return;

//   throwInvalidParam(atrule);
//   fluidRoot(atrule, breakpointsMap);
// };

// throwInvalidParam :: Object -> Void
// function throwInvalidParam(atrule) {
//   if (atrule.params !== '(fluid)') {
//     throw atrule.error(
//       `'${atrule.params}' is invalid value. Use '@root(fluid)'.`,
//     );
//   }
// }

// // defaultRoot :: (Object, Object) -> Void
// function fluidRoot(atrule, breakpointsMap) {
//   const { initial: head, ...tail } = breakpointsMap;

//   addFluidFontForEachBreakpoints(atrule, tail);
//   addCssVariables(atrule, tail);
//   atrule.replaceWith(createFontSizeProp(percentage(head.root)));
// }

// // addFluidFontForEachBreakpoints :: (Object, [Object]) -> Void
// function addFluidFontForEachBreakpoints(atrule, breakpointsMap) {
//   Object.values(breakpointsMap)
//     .reverse()
//     .forEach((b, index, arr) => {
//       const prevIndex = index - 1;
//       const currentElem = arr[index];
//       const prevElem = arr[prevIndex];

//       if (index === 0) {
//         atrule.parent.after(
//           createMediaQuery(b.minWidth).append(
//             createParentSelector(atrule.parent).append(
//               createFontSizeProp(percentage(b.root)),
//             ),
//           ),
//         );
//       }

//       if (index > 0 && arr[prevIndex]) {
//         atrule.parent.after(
//           createMediaQuery(currentElem.minWidth).append(
//             createParentSelector(atrule.parent).append(
//               createFontSizeProp(
//                 createFluidFontSize({
//                   minWidth: currentElem.minWidth,
//                   maxWidth: prevElem.minWidth,
//                   minFontSize: currentElem.root,
//                   maxFontSize: prevElem.root,
//                   fn: percentage,
//                 }),
//               ),
//             ),
//           ),
//         );
//       }
//     });
// }

// UTILS
// addCssVariables :: (Object, Object) -> [Object]
function addCssVariables(atrule, breakpoints) {
  return Object.entries(breakpoints).map(([key, value]) =>
    atrule.before(cssVariable(key, value.minWidth)),
  );
}

// cssVariable :: (String, String) -> Object
function cssVariable(name, value) {
  return decl({
    prop: `--${toKebabCase(name)}`,
    value,
  });
}
