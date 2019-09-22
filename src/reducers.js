import { combineReducers } from 'redux';
import boardReducer from './app/board/duck';

const rootReducer = combineReducers({
  board: boardReducer
});

export default rootReducer;