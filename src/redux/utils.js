function parseToken(token) {
  let jwtData = token.split(".")[1];
  let decodedJwtJsonData = window.atob(jwtData);
  let decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData;
}
export function getRole(token) {
  return parseToken(token).role[0].authority;
}

export function getUsername(token) {
  return parseToken(token).sub;
}
