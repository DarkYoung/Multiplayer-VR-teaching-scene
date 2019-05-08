const express = require('express');

module.exports = (function () {
  var router = express.Router();
  const webTitle = '多人VR教学式场景';
  //render渲染器调用，会调用art-template模块中的template.__express方法，并传入模板文件名和数据
  let renderIndex = function (req, res, next) {
    // 第一个参数是要渲染的页面
    res.render('index.html', {
      title: '首页-' + webTitle,
      pageNav: 'index',
      application: "多人VR教学式场景",
      description: "相关描述"
    });
  };
  // 加载首页
  router.get('/', renderIndex);

  router.get('/index', renderIndex);

  // 加载关于页面
  router.get('/about', function (req, res, next) {
    res.render('about', {
      title: '关于-' + webTitle,
      pageNav: 'about'
    });
  });
  return router;
});
