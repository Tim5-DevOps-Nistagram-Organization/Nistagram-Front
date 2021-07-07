import {
  base,
  createHeaders,
  handleError,
  handleResponse,
  handleResponseText,
} from "./Utils";

const baseUrl = base + "campaign/campaign/";

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

export function getCampaings(username) {
  const headers = createHeaders();
  return fetch(baseUrl + "active/" + username, {
    method: "GET",
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCampaign(id) {
  const headers = createHeaders();
  return fetch(baseUrl + id, {
    method: "DELETE",
    headers,
  })
    .then(handleResponseText)
    .catch(handleError);
}
