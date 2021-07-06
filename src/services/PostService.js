import {
  base,
  createHeaders,
  handleError,
  handleResponse,
  handleResponseText,
} from "./Utils";

const baseUrl = base + "post/post/";

export function create(data) {
  const headers = createHeaders();
  return fetch(baseUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function getById(id) {
  const headers = createHeaders();
  return fetch(baseUrl + id, {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}
