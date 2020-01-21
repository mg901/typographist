const run = require('./run');
const { userConfig, fluidUserConfig } = require('../../../mocks');

describe('@root atrule', () => {
  it('should relpace "@root;" with native css', () => {
    const source = `
        :root {
          @root;
        }`;

    const compiled = `
        :root {
          --tablet: 768px;
          --desktop: 992px;
          --lg-desktop: 1200px;
          font-size: 75%;
        }
@media (min-width: 48em) {
          :root {
                    font-size: 81.25%;
          }
}
@media (min-width: 62em) {
          :root {
                    font-size: 90.625%;
          }
}
@media (min-width: 75em) {
          :root {
                    font-size: 100%;
          }
}`;

    return run(source, compiled, userConfig);
  });

  //   it('should replace "@root(fluid)" with native css', () => {
  //     const source = `
  //             :root {
  //               @root(fluid);
  //             }`;

  //     const compiled = `
  //             :root {
  //               --sm: 640px;
  //               --md: 992px;
  //               --lg: 1440px;
  //               font-size: 75%;
  //             }

  // @media (min-width: 40em) {
  //               :root {
  //                             font-size: calc(0.4261363636363636vw + 57.95454545454546%);
  //               }
  // }
  // @media (min-width: 62em) {
  //               :root {
  //                             font-size: calc(0.33482142857142855vw + 63.61607142857143%);
  //               }
  // }
  // @media (min-width: 90em) {
  //               :root {
  //                             font-size: 93.75%;
  //               }
  // }`;

  //     return run(source, compiled, fluidUserConfig);
  //   });
});
