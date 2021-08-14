const parseToken = (rawToken) => {
  let token = rawToken;

  if (!token) return null;

  token = token.replace("Bearer ", "");

  return token;
};

module.exports = parseToken;
