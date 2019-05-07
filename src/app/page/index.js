// 导入css
require('../../css/common/global.css');
require('../../css/common/grid.css');
require('../../css/lib/reset.css');
require('../../css/page/index.less');
const Dialog = require('../components/dialog/index.js');

$('.g-bd').append('<p class="text">欢迎来到多人 VR 教学系统</p>');
// 绑定事件
$(document).ready(function () {
  $('.btn').on('click', function () {
      Dialog();
  });
});
