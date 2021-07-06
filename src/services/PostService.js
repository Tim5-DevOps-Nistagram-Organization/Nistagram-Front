import {
  base,
  createHeaders,
  handleError,
  handleResponse,
  handleResponseText,
} from "./Utils";

const baseUrl = base + "post/";

export function create(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "post/", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function getById(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "post/" + id, {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createReaction(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "reaction/", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function updateReaction(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "reaction/", {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function deleteReaction(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "reaction/" + id, {
    method: "DELETE",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}
