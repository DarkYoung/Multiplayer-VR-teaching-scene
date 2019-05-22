/*
 * @Author: JasonZhang 
 * @Date: 2019-05-08 19:19:46 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-22 23:48:45
 */
// 导入css
require('@/css/lib/reset.css');
require('@/css/common/global.less');
require('@/css/common/header.less');
require('@/css/page/register.less');
const $user = require('../components/user/user.js');

$(document).ready(function () {
  $('#register').append($user.getRegister());
});
