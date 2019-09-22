import types from './types';

const reset = () => ({
  type: types.RESET_CHESSBOARD
});

export default ({
  reset,
})