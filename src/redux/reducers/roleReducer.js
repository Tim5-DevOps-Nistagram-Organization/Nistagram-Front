import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {getRole} from "../utils";
import * as Role from "../../model/Role";

export default function roleReducer(state = initialState.userRole, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.role;
    case types.LOGOUT_SUCCESS:
      localStorage.setItem("token", null);
      localStorage.clear();
      return Role.UNLOGGED;
    case types.CHECK_USER_ROLE:
      let token = localStorage.getItem("token");
      return token ? getRole(token) : Role.UNLOGGED;
    default:
      return state;
  }
}
