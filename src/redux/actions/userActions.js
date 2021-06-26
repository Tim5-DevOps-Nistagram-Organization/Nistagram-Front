import * as types from "./actionTypes";
import * as authService from "../../services/AuthService";
import {getRole} from "../utils";

export function loginSuccess(role) {
  return {type: types.LOGIN_SUCCESS, role};
}

export function logout() {
  return {type: types.LOGOUT_SUCCESS};
}

export function checkUserRole() {
  return {type: types.CHECK_USER_ROLE};
}

export function login(data) {
  return function (dispatch) {
    return authService
      .login(data)
      .then((token) => {
        localStorage.setItem("token", token["token"]);
        const role = getRole(token["token"]);
        dispatch(loginSuccess(role));
        return role;
      })
      .catch((error) => {
        throw error;
      });
  };
}
