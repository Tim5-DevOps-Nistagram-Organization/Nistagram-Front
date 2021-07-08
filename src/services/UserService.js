import {
  base,
  createHeaders,
  handleError,
  handleResponse,
  handleResponseText,
} from "./Utils";

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

export function updateSettings(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "settings/" + data, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function meDetails() {
  const headers = createHeaders();
  return fetch(baseUrl + "details", {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getByUsername(username) {
  const headers = createHeaders();
  return fetch(baseUrl + "view/" + username, {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function follow(username) {
  const headers = createHeaders();
  return fetch(baseUrl + "follow/" + username, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function unfollow(username) {
  const headers = createHeaders();
  return fetch(baseUrl + "unfollow/" + username, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function mute(username) {
  const headers = createHeaders();
  return fetch(baseUrl + "mute/" + username, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function unmute(username) {
  const headers = createHeaders();
  return fetch(baseUrl + "unmute/" + username, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}

export function followRequests() {
  const headers = createHeaders();
  return fetch(baseUrl + "follow/requests", {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function followRequestsDecision(username, accept) {
  const headers = createHeaders();
  return fetch(baseUrl + "follow/" + username + "/" + accept, {
    method: "PUT",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}
