const express = require('express');
const router = express.Router();
const webTitle = '多人VR教学式场景';
router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: '登录-' + webTitle,
    pageNav: 'login',
    application: "多人VR教学式场景",
    description: "相关描述"
  });
});

router.post('/login', (req, res, next) => {
  console.log('id:' + req.body.id);
  console.log('password:' + req.body.password);
  //TODO 如果用户名&密码正确，登录成功，否则登录失败

  // res.redirect(''); //重定向
});

module.exports = router;
