const bcrypt = require("bcrypt");
const saltRounds = 10;

const getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

module.exports = getHashPassword;