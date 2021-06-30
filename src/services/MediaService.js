import {
  base,
  createHeadersToken,
  handleError,
  handleResponseText,
} from "./Utils";

const baseUrl = base + "/media/media/";

export function upload(file) {
  const formData = new FormData();
  const headers = createHeadersToken();
  formData.append("file", file);
  return fetch(baseUrl, { method: "POST", headers, body: formData })
    .then(handleResponseText)
    .catch(handleError);
}
