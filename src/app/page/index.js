// 导入css
require('../../css/common/global.css');
require('../../css/common/grid.css');
require('../../css/lib/reset.css');
require('../../css/page/index.less');
//import Dialog from '../components/dialog/index.js';
$('.g-bd').append('<p class="text">欢迎来到多人 VR 教学系统</p>');
console.log('wo');
//new Dialog();
// 绑定事件
$('.btn').click(function () {
	require.ensure([], function () {
		var Dialog = require('../components/dialog/index.js');
		Dialog();
	}, 'dialog');
});
