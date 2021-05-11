const run = require('./run');

describe('step', () => {
  test('transform step', async () => {
    const source = `
            h1 {
              font-size: step(6);
            }`;
    const compiled = `
            h1 {
              font-size: 2rem;
            }
@media (min-width: 48em) {
              h1 {
                            font-size: 2.6153846153846154rem;
              }
}
@media (min-width: 62em) {
              h1 {
                            font-size: 3.9310344827586206rem;
              }
}
@media (min-width: 75em) {
              h1 {
                            font-size: 3.9375rem;
              }
}`;

    expect(await run(source)).toMatchSnapshot();
  });
});
