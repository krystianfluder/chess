import { combineReducers } from 'redux';
import figuresReducer from './app/figures/duck';

const rootReducer = combineReducers({
  figures: figuresReducer
});

export default rootReducer;