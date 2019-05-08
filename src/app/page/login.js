// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/login.less');
const $user = require('../components/user/user.js');

$(document).ready(function () {
  $('#login').append($user.getLogin());
});
