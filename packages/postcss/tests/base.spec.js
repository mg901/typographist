const run = require('./run');

describe('base', () => {
  test('transform @base', async () => {
    const source = `
    body {
      @base;
    }`;

    expect(await run(source)).toMatchSnapshot();
  });
});
