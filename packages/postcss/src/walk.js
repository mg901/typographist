const { createBreakpointsMap } = require('@typographist/core');
const { step } = require('./features/step');
const { stepFn } = require('./features/step-function');
const { bubblingRule } = require('./features/bubbling-rule');
const { nestedRule } = require('./features/nested-rule');
const { bubblingAtrule } = require('./features/bubbling-atrule');
const {
  theme,
  // fluidTheme
} = require('./themes');

const {
  renderStandardRoot,
  // renderFluidRoot,
  throwIsNotRootSelector,
} = require('./features/root');
const { renderBase } = require('./features/base');
const {
  renderUp,
  renderDown,
  renderBetween,
  renderOnly,
} = require('./features/media-queries');
const {
  renderH1,
  renderH2,
  renderH3,
  renderH4,
  renderH5,
  renderH6,
} = require('./features/headings');

const plugin = (options) => {
  const breaks = createBreakpointsMap(options || theme);

  return {
    postcssPlugin: 'typographist',
    Once(root) {
      root.walkDecls((decl) => {
        step(decl, breaks);
        stepFn(decl, breaks);
      });

      root.walkAtRules((atrule) => {
        bubblingAtrule(atrule);
      });

      root.walkAtRules((atrule) => {
        if (atrule.name === 'root') {
          throwIsNotRootSelector(atrule);
          renderStandardRoot(atrule, breaks);
        }
      });

      root.walkAtRules((atrule) => {
        const atrules = {
          base: renderBase,
          up: renderUp,
          down: renderDown,
          only: renderOnly,
          between: renderBetween,
        };

        if (atrules[atrule.name]) {
          atrules[atrule.name](atrule, breaks);
        }
      });

      root.walkAtRules((atrule) => {
        const headings = {
          h1: renderH1,
          h2: renderH2,
          h3: renderH3,
          h4: renderH4,
          h5: renderH5,
          h6: renderH6,
        };

        if (headings[atrule.name]) {
          headings[atrule.name](atrule, breaks);
        }
      });

      root.walkRules((rule) => {
        bubblingRule(rule);
        nestedRule(rule);
      });

      // Remove empty rules.
      root.walkRules((rule) => {
        if (!rule.nodes.length) rule.remove();
      });
    },
  };
};

plugin.postcss = true;
exports.typographist = plugin;
