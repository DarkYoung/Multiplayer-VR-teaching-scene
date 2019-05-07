// 加载模块css
require('./css/dialog.less');
// 加载html模板
const html = require('./tmpl/dialog.html');

// 导出模块
module.exports = function (){
	var $dialog = $(html).clone();
	alert('hhh');
	$dialog.find('.close').on('click', function () {
		$dialog.fadeOut(function () {
			$(this).remove();
		});
	});
	$('body').append($dialog);
	$dialog.fadeIn();
};
