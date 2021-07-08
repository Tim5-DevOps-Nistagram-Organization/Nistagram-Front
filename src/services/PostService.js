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

export function unappropriatedContent(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "unappropriatedContent/", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function reports() {
  const headers = createHeaders();
  return fetch(baseUrl + "unappropriatedContent/requests", {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function reportAccept(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "unappropriatedContent/approve/" + id, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function reportReject(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "unappropriatedContent/reject/" + id, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function getCommentsByPostId(id) {
  const headers = createHeaders();
  return fetch(baseUrl + "comment/" + id, {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createComment(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "comment/", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
