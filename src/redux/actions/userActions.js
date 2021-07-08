import * as types from "./actionTypes";
import * as authService from "../../services/AuthService";

export function loginSuccess(token) {
  return { type: types.LOGIN_SUCCESS, token };
}

export function logout() {
  return { type: types.LOGOUT_SUCCESS };
}

export function checkUserRole() {
  return { type: types.CHECK_USER_ROLE };
}

export function login(data) {
  return function (dispatch) {
    return authService
      .login(data)
      .then((token) => {
        dispatch(loginSuccess(token["token"]));
      })
      .catch((error) => {
        throw error;
      });
  };
}
