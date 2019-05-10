/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:19 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-10 22:15:00
 */
// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/index.less');
const splash = require('../components/splash/spalsh');
const entries = require('../components/entry/entry');
const descText = $(splash).find('#desc_none').html();
let count = 1;

// 等待输入
const waitingForInput = function (element, millisecond) {
  let input = true,
    over = 0,
    step = millisecond / 10;
  let dividing = new RegExp('\|$');
  setInterval(() => {
    over += step;
    if (over > millisecond)
      return;
    if (input)
      $(element).append("|");
    else {
      if (dividing.test($(element).html())) {
        $(element).html($(element).html().substring(0, $(element).html().length - 1));
      }
    }
    input = !input;
  }, step)
};

// 逐字输入
function setText() {
  $(splash).find('#desc').html(descText.substring(0, count++));
  if (count > descText.length)
    return;
  else
    setTimeout(setText, 100);
}

// 文字显示动画
function setTextAnimation() {
  waitingForInput($(splash.find('#desc')), 2000);
  setTimeout(setText, 1500);
}

// 绑定事件
$(document).ready(function () {
  $('#splash').append(splash);
  setTextAnimation();
  $('#article').append(entries);
  $('#splash').on('click', '#start', () => {
    $('html, body').animate({
      scrollTop: $('#splash').find('.component-splash').height()
    }, 300);
  });
});
