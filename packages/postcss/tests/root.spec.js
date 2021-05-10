const run = require('./run');

test('transform `@root`', async () => {
  const source = `
        :root {
          @root;
        }`;

  expect(await run(source)).toMatchSnapshot();
});

//   it('should replace "@root(fluid)" with native css', () => {
//     const source = `
//             :root {
//               @root(fluid);
//             }`;

//     const compiled = `
//             :root {
//               --sm: 640px;
//               --md: 992px;
//               --lg: 1440px;
//               font-size: 75%;
//             }

// @media (min-width: 40em) {
//               :root {
//                             font-size: calc(0.4261363636363636vw + 57.95454545454546%);
//               }
// }
// @media (min-width: 62em) {
//               :root {
//                             font-size: calc(0.33482142857142855vw + 63.61607142857143%);
//               }
// }
// @media (min-width: 90em) {
//               :root {
//                             font-size: 93.75%;
//               }
// }`;

//     return run(source, compiled, fluidUserConfig);
//   });
