const run = require('./run');

test('transform bubbling rule', async () => {
  const source = `
        :global {
          .test {
            color: red;
          }
          .some-item {
            font-size: 1rem;
          }
        }
        :local {
          .item {
            width: 200px;
          }
        }`;

  expect(await run(source)).toMatchSnapshot();
});
