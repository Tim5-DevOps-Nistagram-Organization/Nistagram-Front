import { combineReducers } from "redux";
import userRole from "./roleReducer";
import username from "./usernameReducer";

const rootReducer = combineReducers({
  userRole,
  username,
});

export default rootReducer;
