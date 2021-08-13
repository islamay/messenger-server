const parseToken = (rawToken) => {
  let token = rawToken;
  console.log(token);

  if (!token) return null;

  token = token.replace("Bearer ", "");

  return token;
};

module.exports = parseToken;
