import { createHeaders, handleError, handleResponse } from "./Utils";

// const baseUrl = process.env.REACT_APP_API_GATEWAY_URL + "order/order";
const baseUrl = "http://localhost:8080/user/";

export function login(data) {
  const headers = createHeaders();
  return fetch(baseUrl + "login", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

