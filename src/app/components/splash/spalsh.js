// 加载模块css
require('./splash.less');
// 加载html模板
const html = require('./splash.html');

// 导出模块
module.exports = $(html).clone();
