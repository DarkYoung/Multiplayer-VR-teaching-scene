/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:23 
 * @Last Modified by:   JasonZhang 
 * @Last Modified time: 2019-05-10 11:27:23 
 */
// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/login.less');
const $user = require('../components/user/user.js');

$(document).ready(function () {
  $('#login').append($user.getLogin());
});
