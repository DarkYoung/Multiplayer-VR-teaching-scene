require('./user.less');

const login = require('./login.html');
const register = require('./register.html');
module.exports = {
  "getLogin": function () {
    return $(login).clone();
  },
  "getRegister": function () {
    return $(register).clone();
  }
};
