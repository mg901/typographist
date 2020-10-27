const run = require('./run');
const { userConfig } = require('../../../mocks');

describe('@base', () => {
  it(
    'should replace @base with css variables with breakpoint values, ' +
      'the font size specified in percent, specify the font size for each breakpoint',
    () => {
      const source = `
            body {
              @base;
            }`;
      const compiled = `
            body {
              font-size: 1.3333333333333333rem;
              line-height: 2rem;
              font-style: normal;
              font-weight: normal;
            }
@media (min-width: 48em) {
              body {
                            font-size: 1.3076923076923077rem;
              }
}
@media (min-width: 62em) {
              body {
                            font-size: 1.3103448275862069rem;
              }
}
@media (min-width: 75em) {
              body {
                            font-size: 1.3125rem;
              }
}`;
      return run(source, compiled, userConfig);
    },
  );
});
