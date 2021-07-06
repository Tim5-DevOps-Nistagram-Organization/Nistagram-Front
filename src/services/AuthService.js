import {
  base,
  createHeaders,
  handleError,
  handleResponse,
  handleResponseText,
} from "./Utils";

const baseUrl = base + "auth/";

export function login(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "user/login", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function registrationRegular(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "user/registration", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function registrationAgetn(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "agent/registration", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}
