/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:19 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-10 12:58:32
 */
// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/index.less');
const Dialog = require('../components/dialog/index');
const $splash = require('../components/splash/spalsh');
const entries = require('../components/entry/entry');
const descText = $($splash).find('#desc_none').html();
let count = 0;

function setText() {
  $($splash).find('#desc').html(descText.substring(0, count++));
  if (count > descText.length)
    return;
  else
    setTimeout(setText, 100);
}
// 绑定事件
$(document).ready(function () {
  // $('.btn').on('click', function () {
  // Dialog();
  // });
  $('#splash').append($splash);
  setText();
  $('#article').append(entries);
});
