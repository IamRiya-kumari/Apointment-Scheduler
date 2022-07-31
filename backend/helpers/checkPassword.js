const bcrypt = require("bcrypt");

const checkPassword = async (password, hashPassword) => {
  return await bcrypt.compareSync(password, hashPassword);
};

module.exports = checkPassword;