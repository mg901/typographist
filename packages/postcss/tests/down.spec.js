const run = require('./run');
const { userConfig } = require('../../../mocks');

describe('@down', () => {
  it('should replace @down(desktop) with @media (min-width: 61.99875em)', () => {
    const source = `
            .test {
              @down (desktop) {
                background-color: gold;
                }
            }`;
    const compiled = `
            @media (max-width: 74.99875em) {
    .test {
        background-color: gold;
    }
}`;
    
return run(source, compiled, userConfig);
  });
  it('should replace @down(1000px) with @media (min-width: 62.5em)', () => {
    const source = `
            .test {
              @down (1000px) {
                background-color: gold;
                }
            }`;
    const compiled = `
            @media (max-width: 62.49875em) {
    .test {
        background-color: gold;
    }
}`;
    
return run(source, compiled, userConfig);
  });
  it('should replace @down(40em) with @media (min-width: 40em)', () => {
    const source = `
            .test {
              @down (40em) {
                background-color: gold;
                }
            }`;
    const compiled = `
            @media (max-width: 39.99875em) {
    .test {
        background-color: gold;
    }
}`;
    
return run(source, compiled, userConfig);
  });
});

describe('@down atrule with orientation', () => {
  it('should replace @down(desktop):landscape with @media (min-width: 61.99875em) and (orientation: landscape)', () => {
    const source = `
              .test {
                @down (desktop):landscape {
                  background-color: gold;
                  }
              }`;
    const compiled = `
              @media (max-width: 74.99875em) and (orientation: landscape) {
    .test {
        background-color: gold;
    }
}`;
    
return run(source, compiled, userConfig);
  });
});
