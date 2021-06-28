import { base, createHeaders, handleError, handleResponse } from "./Utils";

const baseUrl = base + "search/";

export function searchUsers(username, numOfPage, sizeOfPage) {
  const headers = createHeaders();
  return fetch(
    `${baseUrl}user?username=${encodeURIComponent(
      username
    )}&numOfPage=${encodeURIComponent(
      numOfPage
    )}&sizeOfPage=${encodeURIComponent(sizeOfPage)}`,
    {
      method: "GET",
      headers,
    }
  )
    .then(handleResponse)
    .catch(handleError);
}
