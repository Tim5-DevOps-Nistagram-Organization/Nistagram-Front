export function getRole(token) {
  let jwtData = token.split(".")[1];
  let decodedJwtJsonData = window.atob(jwtData);
  let decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData.role[0].authority;
}