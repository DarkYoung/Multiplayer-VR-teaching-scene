/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:26:45 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-10 12:44:39
 */
// 加载模块css
require('./splash.less');
// 加载html模板
const html = require('./splash.html');


// 导出模块
module.exports = $(html).clone();
