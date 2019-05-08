const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res, next) => {
  res.render('login', {

  });
});

router.post('/login', (req, res, next) => {
  console.log('id:' + req.body.id);
  console.log('password:' + req.body.password);
  //TODO 如果用户名&密码正确，登录成功，否则登录失败

  // res.redirect(''); //重定向
});

module.exports = router;
