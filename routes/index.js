const express = require('express');

const router = express.Router();
const webTitle = '多人VR教学式场景';
//render渲染器调用，会调用art-template模块中的template.__express方法，并传入模板文件名和数据
// 加载首页
router.get('/', function (req, res, next) {
  // 第一个参数是要渲染的页面
  res.render('index', {
    title: '首页-' + webTitle,
    pageNav: 'index'
  });
  //   res.send('<h1>' + webTitle + '</h1>');
});

// 加载关于页面
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: '关于-' + webTitle,
    pageNav: 'about'
  });
});

router.post('/login', (req, res) => {
  console.log('id:' + req.body.id);
  console.log('password:' + req.body.password);
  res.redirect('/'); //重定向
});

module.exports = router;
