/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:27:19 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-16 18:52:59
 */
// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');
require('../../css/page/index.less');
const CanvasNest = require('canvas-nest.js');
const splash = require('../components/splash/spalsh');
const entries = require('../components/entry/entry');
const descText = $(splash).find('#desc_none').html();
const Blocker = require('../components/blocker/blocker');
const config = {
  color: '102,102,255', // 连线颜色
  pointColor: '153,102,255', // 点的颜色
  opacity: 0.8, // 透明度
  zIndex: 2, // canvas 的z-index值
  count: 150 // 连线的数量
};

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
  new CanvasNest(document.body, config);
});
