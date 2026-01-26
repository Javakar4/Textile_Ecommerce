
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};


export const isTokenExpired = (token) => {
  const decoded = parseJwt(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
};


export const getTokenExpiration = (token) => {
  const decoded = parseJwt(token);
  if (!decoded) return null;
  return decoded.exp * 1000;
};
