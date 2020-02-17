const { rule, decl } = require('postcss');
const { toRem } = require('@typographist/utils');
const { createFontSizeProp, createMediaQuery } = require('../elements');

const props = [
  decl({
    prop: 'line-height',
    value: '2rem',
  }),
  decl({
    prop: 'font-style',
    value: 'normal',
  }),
  decl({
    prop: 'font-weight',
    value: 'normal',
  }),
];

// base :: (Object, Object) -> Void
exports.renderBase = (atrule, breakpointsMap) => {
  if (atrule.name !== 'base') return;

  throwIsNotBodySelector(atrule);
  const [head, ...tail] = Object.values(breakpointsMap);

  tail.reverse().forEach(({ root, base, minWidth }) => {
    const body = rule({
      selector: 'body',
    }).append(createFontSizeProp(toRem(root)(base)));

    atrule.parent.after(createMediaQuery(minWidth).append(body));
  });

  atrule.replaceWith(createFontSizeProp(toRem(head.root)(head.base)), ...props);
};

// exports.renderFluidBase = (atrule, breakpointsMap) => {
//   if (atrule.name !== 'base') return;
//   throwIsNotBodySelector(atrule);

//   const { initial: head, ...tail } = breakpointsMap;
//   addFluidFontForEachBreakpoints(atrule, tail);
//   atrule.replaceWith(createFontSizeProp(toRem(head.root)(head.base)), ...props);
// };

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
//               createFontSizeProp(toRem(b.root)(b.base)),
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
//                   minFontSize: currentElem.base,
//                   maxFontSize: prevElem.base,
//                   fn: toRem(currentElem.root),
//                 }),
//               ),
//             ),
//           ),
//         );
//       }
//     });
// }

// throwIsNotBodySelector :: Object -> Void
function throwIsNotBodySelector(atrule) {
  if (atrule.parent && atrule.parent.selector !== 'body') {
    throw atrule.error(`Use the '${atrule}' only with the 'body' selector.`);
  }
}
