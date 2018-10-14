import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import combinedReducer from "~reducers/combined-reducer";

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combinedReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
