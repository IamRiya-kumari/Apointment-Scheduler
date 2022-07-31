const jwt = require("jsonwebtoken");

const getJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS512",
  });
};

module.exports = getJwtToken;