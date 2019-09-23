import types from './types';

const reset = () => ({
  type: types.RESET_FIGURES
});

const set = () => ({
  type: types.SET_FIGURES
})

const select = () => ({
  type: types.SELECT_FIGURE
})

const move = () => ({
  type: types.MOVE_FIGURE
})

export default ({
  reset,
  set,
  select,
  move,
})