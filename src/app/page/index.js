/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:19 
 * @Last Modified by:   JasonZhang 
 * @Last Modified time: 2019-05-10 11:27:19 
 */
// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/index.less');
const Dialog = require('../components/dialog/index');
const $splash = require('../components/splash/spalsh');
const Entry = require('../components/entry/entry');
const entry = new Entry();

// 绑定事件
$(document).ready(function () {
  // $('.btn').on('click', function () {
  // Dialog();
  // });
  $('#splash').append($splash);
  $('#article').append(entry.getEntries());
});
