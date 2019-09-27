import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import { figuresReducer } from './reducers/index';

const rootReducer = combineReducers({
  figures: undoable(figuresReducer, {
    undoType: 'FIGURES_UNDO',
    redoType: 'FIGURES_REDO',
    filter: includeAction('MOVE_FIGURE'),
    // here you will want to configure specific redux-undo action type  
  }),
});

export default rootReducer;