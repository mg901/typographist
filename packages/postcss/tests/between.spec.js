const run = require('./run');

describe('base', () => {
  test('with breakpoints name', async () => {
    const source = `
    .test {
      @between(tablet, desktop) {
          color: hotpink;
      }
    }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with pixels', async () => {
    const source = `
    .test {
      @between(1000px, 2000px) {
        color: hotpink;
      }
    }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with em', async () => {
    const source = `
              .test {
                @between(30em, 50em) {
                  color: hotpink;
                }
              }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `landscape`', async () => {
    const source = `
                .test {
                  @between(30em, 50em):landscape {
                    color: hotpink;
                  }
                }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `portrait`', async () => {
    const source = `
            .test {
              @between(30em, 50em):portrait {
                color: hotpink;
              }
            }`;

    expect(await run(source)).toMatchSnapshot();
  });
});
