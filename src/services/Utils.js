export function createHeaders() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return headers;
}

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400 || response.status === 404) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.json();
    throw new Error(error["message"]);
  }
  throw new Error("Network response was not ok.");
}

export async function handleResponseText(response) {
  if (response.ok) return response.text();
  if (response.status === 400 || response.status === 404) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.json();
    throw new Error(error["message"]);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export const base = process.env.REACT_APP_API_GATEWAY_URL;