// 导入css
require('bootstrap/dist/css/bootstrap.css');
require('../../css/common/global.css');
require('../../css/lib/reset.css');
require('../../css/page/index.less');
const Dialog = require('../components/dialog/index.js');

// 绑定事件
$(document).ready(function () {
  $('.btn').on('click', function () {
      Dialog();
  });
});
