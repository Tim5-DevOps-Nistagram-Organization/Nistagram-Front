import { base, createHeaders, handleError, handleResponseText } from "./Utils";

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
