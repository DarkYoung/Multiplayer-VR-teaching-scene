// 加载模块css
require('./dialog.less');
// 加载html模板
const html = require('./dialog.html');

// 导出模块
module.exports = function (){
	var $dialog = $(html).clone();
	$dialog.find('.close').on('click', function () {
		$dialog.fadeOut(function () {
			$(this).remove();
		});
	});
	$('body').append($dialog);
	$dialog.fadeIn();
};
