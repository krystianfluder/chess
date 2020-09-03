import figuresReducer from "./figures";
import authReducer from "./auth";
import errorReducer from "./error";
import commonReducer from "./common";

import { combineReducers } from "redux";
import undoable, { includeAction } from "redux-undo";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  common: commonReducer,
  figures: undoable(figuresReducer, {
    undoType: "FIGURES_UNDO",
    redoType: "FIGURES_REDO",
    filter: includeAction("MOVE_FIGURE"),
    // here you will want to configure specific redux-undo action type
  }),
});

export default rootReducer;
