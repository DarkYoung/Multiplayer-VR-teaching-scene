/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:04 
 * @Last Modified by:   JasonZhang 
 * @Last Modified time: 2019-05-10 11:27:04 
 */
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
