// 导入css
require('../../css/lib/reset.css');
require('../../css/common/global.less');
require('../../css/common/header.less');

const $login = require('../components/login/login.js');

$(document).ready(function(){
    $('#login').append($login);
});