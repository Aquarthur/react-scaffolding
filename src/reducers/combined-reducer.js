import { combineReducers } from "redux";
import exampleReducer from "~reducers/example-reducer";

const combinedReducer = combineReducers({
  exampleReducer,
});

export default combinedReducer;
