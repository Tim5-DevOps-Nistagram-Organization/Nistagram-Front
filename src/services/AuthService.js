import {
  base,
  createHeaders,
  handleError,
  handleResponse,
  handleResponseText,
} from "./Utils";

const baseUrl = base + "auth/user/";

export function login(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "login", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function registration(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "registration", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}
