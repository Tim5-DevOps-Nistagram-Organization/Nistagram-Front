import {base, createHeaders, handleError, handleResponse, handleResponseText} from "./Utils";

const baseUrl = base + "user/user/";

export function me() {
  const headers = createHeaders();
  return fetch(baseUrl, {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function update(data) {
  const headers = createHeaders();
  return fetch(baseUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}