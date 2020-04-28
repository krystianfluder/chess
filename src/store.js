import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
