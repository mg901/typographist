const run = require('./run');

describe('@down', () => {
  test('with breakpoints name', async () => {
    const source = `
            .test {
              @down (desktop) {
                background-color: gold;
                }
            }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with pixels', async () => {
    const source = `
            .test {
              @down (1000px) {
                background-color: gold;
                }
            }`;

    expect(await run(source)).toMatchSnapshot();
  });
  test('with em', async () => {
    const source = `
            .test {
              @down (40em) {
                background-color: gold;
                }
            }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `landscape`', async () => {
    const source = `
              .test {
                @down (desktop):landscape {
                  background-color: gold;
                  }
              }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `portrait`', async () => {
    const source = `
              .test {
                @down (desktop):portrait {
                  background-color: gold;
                  }
              }`;

    expect(await run(source)).toMatchSnapshot();
  });
});
