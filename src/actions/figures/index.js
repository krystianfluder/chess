import { figuresTypes as types } from '../../types';

const reset = () => ({
  type: types.RESET_FIGURES
});

const set = () => ({
  type: types.SET_FIGURES
})

const select = (position) => ({
  type: types.SELECT_FIGURE, position
})

const move = (position) => ({
  type: types.MOVE_FIGURE, position
})

export default ({
  reset,
  set,
  select,
  move,
})