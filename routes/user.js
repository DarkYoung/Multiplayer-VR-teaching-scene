const express = require('express');
const router = express.Router();
const utility = require('utility');
// const UserModel = require('../model.js')(); //数据库结构
// const User = UserModel.getModel('user');
// const filter = {
// pwd: 0,
// __v: 0
// }

const webTitle = '多人VR教学式场景';

router.get('/', (req, res) => {
  res.redirect('/user/login');
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
  res.send("登录成功，5s后自动返回首页～<a href='/index'>点击立即返回</a>");
  // const {
  //   user,
  //   pwd
  // } = req.body;
  // //查询是否能够匹配用户名密码保持一直的字段
  // User.findOne({
  //   user,
  //   pwd: encryption(pwd)
  // }, filter, (err, doc) => {
  //   if (doc) {
  //     res.cookie('userid', doc._id);
  //     return res.json({
  //       code: 0,
  //       msg: '登陆成功',
  //       data: doc
  //     });
  //   }

  //   return res.json({
  //     code: 1,
  //     msg: '用户名或密码错误'
  //   })
  // });
  //TODO 如果用户名&密码正确，登录成功，否则登录失败

  // res.redirect(''); //重定向
});
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: '注册-' + webTitle,
    pageNav: 'register',
    application: "多人VR教学式场景",
    description: "相关描述"
  });
});
// 注册响应 /user/register
router.post('/register', function (req, res) {
  // const {
  //   user,
  //   pwd,
  //   type
  // } = req.body;
  // //查询是否已经存在该用户
  // User.findOne({
  //   user
  // }, (err, doc) => {
  //   if (doc) {
  //     return res.json({
  //       code: 1,
  //       msg: '该用户已存在'
  //     })
  //   }

  //   let userModel = new User({
  //     user,
  //     type,
  //     pwd: encryption(pwd)
  //   });
  //   userModel.save((err, doc) => {
  //     if (err) {
  //       return res.json({
  //         code: 1,
  //         msg: '服务器出现错误'
  //       })
  //     }
  //     res.cookie('userid', doc._id);
  //     return res.json({
  //       code: 0,
  //       msg: '注册成功'
  //     })
  //   })
  // })
  res.send("注册成功，10s后自动返回首页～<a href='/index'>点击立即返回</a>")
});

router.get('/info', (req, res, next) => {
  // let cookie = req.cookies;
  // if (!cookie.userid) {
  //   return res.json({
  //     code: 1,
  //     isLogin: false,
  //     msg: '用户未登录'
  //   });
  // }
  // //查询该用户ID是否存在
  // User.findOne({
  //   _id: cookie.userid
  // }, filter, function (err, doc) {
  //   if (err) {
  //     return res.json({
  //       code: 1,
  //       isLogin: false,
  //       msg: '服务器出现错误'
  //     });
  //   }
  //   return res.json({
  //     code: 0,
  //     isLogin: true,
  //     msg: '用户已登陆',
  //     data: doc
  //   });
  // })
});

const salt = "vr_account";

function encryption(pwd) {
  return utility.md5(utility.md5(pwd + salt));
}
module.exports = router;
