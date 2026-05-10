
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};


export const isTokenExpired = (token) => {
  const decoded = parseJwt(token);
  console.log("from is token expired check here the decoded data ",decoded);
  if (!decoded) return true;
  console.log("is token expired", decoded.exp * 1000 < Date.now())
  return decoded.exp * 1000 < Date.now();
};


export const getTokenExpiration = (token) => {
  const decoded = parseJwt(token);
  if (!decoded) return null;
  return decoded.exp * 1000;
};
