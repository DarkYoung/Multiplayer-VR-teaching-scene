// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/index.less');
const Dialog = require('../components/dialog/index.js');
const $splash = require('../components/splash/spalsh.js');
// 绑定事件
$(document).ready(function () {
  $('.btn').on('click', function () {
    Dialog();
  });
  $('#splash').append($splash);
});
