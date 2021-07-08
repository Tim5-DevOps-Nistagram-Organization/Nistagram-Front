import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { getUsername } from "../utils";

export default function usernameReducer(state = initialState.username, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return getUsername(action.token);
    case types.LOGOUT_SUCCESS:
      return "";
    case types.CHECK_USER_ROLE:
      let token = localStorage.getItem("token");
      return token ? getUsername(token) : "";
    default:
      return state;
  }
}
