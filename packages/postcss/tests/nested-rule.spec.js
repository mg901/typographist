const run = require('./run');

test('transform nested rule', async () => {
  const source = `
        .test,
        .some-test {
          font-size: 1rem;
          &__wrap,
          &__inner {
            font-size: 2rem;
            &:hover {
              background-color: pink;
            }
          }
        }`;

  expect(await run(source)).toMatchSnapshot();
});
