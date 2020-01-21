const run = require('./run');
const { userConfig } = require('../../../mocks');

describe('transform step unit function', () => {
  it('should transform from step to rem if @up atrule is set.', () => {
    const source = `
              .test {
                @up(desktop) {
                  font-size: 2step;
                }
              }`;
    const compiled = `
              @media (min-width: 62em) {
    .test {
        font-size: 1.8620689655172413rem;
    }
}`;
    return run(source, compiled, userConfig);
  });
  it('should transform step to rem if @down is set.', () => {
    const source = `
                  .test {
                    @down(desktop) {
                      font-size: 2step;
                    }
                  }`;
    const compiled = `
                  @media (max-width: 74.99875em) {
    .test {
        font-size: 1.8620689655172413rem;
    }
}`;
    return run(source, compiled, userConfig);
  });
  it('should transform step to rem if @only is set.', () => {
    const source = `
                  .test {
                    @only(desktop) {
                      font-size: 2step;
                    }
                  }`;
    const compiled = `
                  @media (min-width: 62em) and (max-width: 74.99875em) {
    .test {
        font-size: 1.8620689655172413rem;
    }
}`;
    return run(source, compiled, userConfig);
  });
});
