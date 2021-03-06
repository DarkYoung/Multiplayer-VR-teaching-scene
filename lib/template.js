/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:30:26 
 * @Last Modified by:   JasonZhang 
 * @Last Modified time: 2019-05-10 11:30:26 
 */
require('express-art-template');
const template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
template.config('cache', false);

// 关闭编码html字符
template.config('escape', false);
// 日期格式化
template.helper('dataFormat', function (data, format) {
  date = new Date(data);
  const map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.sustr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  })
  return format;
});

template.helper('age', function (birth) {
  return parseInt((Date.now() - birth) / (1000 * 60 * 60 * 24 * 365));
})

module.exports = template;
