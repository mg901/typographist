const run = require('./run');
const { userConfig } = require('../../../mocks');

describe('@up', () => {
  test('with breakpoints name', async () => {
    const source = `
          .test {
            @up(desktop) {
              background-color: orange;
            }
          }`;

    expect(await run(source)).toMatchSnapshot();
  });

  test('with pixels', async () => {
    const source = `
            .test {
              @up(1000px) {
                background-color: orange;
              }
            }`;
    expect(await run(source)).toMatchSnapshot();
  });
  test('with em', async () => {
    const source = `
            .test {
              @up(40em) {
                background-color: orange;
              }
            }`;
    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `landscape`', async () => {
    const source = `
        .test {
          @up(40em):landscape {
            background-color: orange;
          }
        }`;
    expect(await run(source)).toMatchSnapshot();
  });

  test('with orientation `portrait`', async () => {
    const source = `
          .test {
            @up(40em):portrait {
              background-color: orange;
            }
          }`;
    expect(await run(source)).toMatchSnapshot();
  });
});
