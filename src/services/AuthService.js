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

export function registrationRequests() {
  const headers = createHeaders();
  return fetch(baseUrl + "agent/requests", {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function registrationRequestsAccept(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "agent/approve/" + id, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function registrationRequestsReject(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "agent/reject/" + id, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}
