const run = require('./run');
const { userConfig } = require('../../../mocks');

describe('transform step function', () => {
  it('should replace the step function with the font size in rem for each breakpoint', () => {
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
    
return run(source, compiled, userConfig);
  });
});
