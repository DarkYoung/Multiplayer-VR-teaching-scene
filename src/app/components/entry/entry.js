/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:26:00 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-10 12:58:08
 */
require('./entry.less');

const entries = require('./entry.html');

module.exports = $(entries).clone();
