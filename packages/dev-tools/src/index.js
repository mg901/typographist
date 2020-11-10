const keycodes = {
  S: 83,
  R: 82,
  D: 68,
  O: 79,
};

const createToggler = () => {
  const state = {
    currentState: 0,
    nextState: {
      0: 1,
      1: 2,
      2: 0,
    },
    lables: {
      0: 'disabled',
      1: 'single',
      2: 'double',
    },
    keyCodeHanlders: [],
    currentPressedKeys: new Set(),
    finishHotKeyDelay: 250,
  };

  state.setCurrentLabel = () => {
    state.currentLabel = state.lables[state.currentState];
    localStorage.setItem('rhythm', state.currentLabel);
  };

  state.setSingleRhythm = () => {
    state.currentState = state.lables['1'];
    state.setCurrentLabel();
  };

  state.setDoubleRhythm = () => {
    state.currentState = state.lables['2'];
    state.setCurrentLabel();
  };

  state.disableRhythm = () => {
    state.currentState = state.lables['0'];
    state.setCurrentLabel();
  };

  state.toggle = () => {
    state.currentState = state.nextState[state.currentState];
    state.setCurrentLabel();
  };

  state.on = (keys, handler) => {
    state.keyCodeHanlders.push({
      keycode: keys,
      handler,
    });
  };

  state.getKeyCodeHandler = () =>
    state.keyCodeHanlders.find(
      ({ keycode }) =>
        state.currentPressedKeys.size === keycode.length &&
        keycode.every((key) => state.currentPressedKeys.has(key)),
    );

  state.handleKeyPress = (e) => {
    state.currentPressedKeys.add(e.which || e.keyCode);
    const keyCodeHandler = state.getKeyCodeHandler();

    if (keyCodeHandler) {
      keyCodeHandler.handler();
    } else {
      setTimeout(
        () => state.currentPressedKeys.clear(),
        state.finishHotKeyDelay,
      );
    }
  };

  localStorage.setItem('rhythm', state.currentLabel);
  state.on([keycodes.S, keycodes.R], state.setSingleRhythm);
  state.on([keycodes.D, keycodes.R], state.setDoubleRhythm);
  state.on([keycodes.O, keycodes.R], state.disableRhythm);

  return state;
};

const toggler = createToggler();
const rootElem = document.getElementById('root');
const wrappers = Array.from(document.querySelectorAll('[data-rhythm]'));

const createButton = (text) => `
        <button type="button" id="dev-tools-toggle" class="dev-tools-toggle-button">${text}</button>
`;

const initApp = () => {
  const label = toggler.lables['0'];
  rootElem.insertAdjacentHTML('afterbegin', createButton(label));
  wrappers.forEach((elem) => {
    elem.dataset.rhythm = label;
  });
};

const toggleButton = (e) => {
  const isToggleButton = e.target.id === 'dev-tools-toggle';

  if (isToggleButton) {
    toggler.toggle();
    const label = toggler.currentLabel;
    wrappers.forEach((elem) => {
      elem.dataset.rhythm = label;
    });
    e.target.textContent = label;
  }
};

const handleKeyUp = (e) => {
  const toggleElem = document.getElementById('dev-tools-toggle');
  const label = toggler.currentLabel;
  toggler.handleKeyPress(e);

  toggleElem.textContent = label;
  wrappers.forEach((elem) => {
    elem.dataset.rhythm = label;
  });
};

document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('click', toggleButton);
document.addEventListener('keydown', toggler.handleKeyPress);
document.addEventListener('keyup', handleKeyUp);
