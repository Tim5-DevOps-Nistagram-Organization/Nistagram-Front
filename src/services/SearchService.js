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

export function searchPosts(tag, numOfPage, sizeOfPage) {
  const headers = createHeaders();
  return fetch(
    `${baseUrl}post/tag?tag=${encodeURIComponent(
      tag
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

export function home(numOfPage, sizeOfPage) {
  const headers = createHeaders();
  return fetch(
    `${baseUrl}post/home?numOfPage=${encodeURIComponent(
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

export function user(username, numOfPage, sizeOfPage) {
  const headers = createHeaders();
  return fetch(
    `${baseUrl}post/user?username=${encodeURIComponent(
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

export function searchReactions(reaction, numOfPage, sizeOfPage) {
  const headers = createHeaders();
  return fetch(
    `${baseUrl}post/reaction?myReaction=${encodeURIComponent(
      reaction
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
