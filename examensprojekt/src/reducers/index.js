import log from "./log";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLoggedIn: log,
});

export default allReducers;
