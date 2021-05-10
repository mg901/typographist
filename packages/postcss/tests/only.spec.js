const run = require('./run');

describe('@only', () => {
  test('with breakpoints name', async () => {
    const source = `
          .test {
            @only (desktop) {
              background-color: rebeccapurple;
            }
          }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with pixels', async () => {
    const source = `
            .test {
              @only (1000px) {
                background-color: gold;
                }
            }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with em', async () => {
    const source = `
            .test {
              @only (40em) {
                background-color: gold;
                }
            }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `landscape`', async () => {
    const source = `
              .test {
                @only (desktop):landscape {
                  background-color: gold;
                  }
              }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `portrait`', async () => {
    const source = `
              .test {
                @only (desktop):portrait {
                  background-color: gold;
                  }
              }`;

    expect(await run(source)).toMatchSnapshot();
  });
});

// describe('@only atrule with orientation', () => {
//   it('should replace @only(desktop):landscape with @media (min-width: 48em) and (max-width: 61.99875em) and (orientation: landscape)', () => {
//     const source = `
//           .test {
//             @only (desktop):landscape {
//               background-color: rebeccapurple;
//             }
//           }`;
//     const compiled = `
//           @media (min-width: 62em) and (max-width: 74.99875em) and (orientation: landscape) {
//     .test {
//         background-color: rebeccapurple;
//     }
// }`;

//     return run(source, compiled, userConfig);
//   });
// });
