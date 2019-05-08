// epxress 的主要文件，指定模板引擎、视图文件默认路径等
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// body-parser 是express的post请求中用来获得请求体(请求参数)的一种第三方包
const bodyParser = require('body-parser');

const app = express();

// var template = require('./lib/template');
// var template = require('art-template');
app.engine('html', require('express-art-template'));
// app.engine('.html', template.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.set("views", path.join(__dirname, 'dist')); // 设置视图文件根路径
app.use(express.static(path.join(__dirname, 'dist'))); // 设置静态文件（css、js等）根路径
app.use('/user', require('./routes/user')); // 设置用户相关路由
// 设置/usr路径的静态文件路径，不设置就会在导入的静态文件前加上/user，导致找不到文件
app.use('/user', express.static(path.join(__dirname, 'dist')));
app.use('/game', require('./routes/game')); // 设置VR游戏相关路由
app.use('/game', express.static(path.join(__dirname, 'dist')));
app.use('/', require('./routes/index')); // 设置首页路由
app.use('/', express.static(path.join(__dirname, 'dist')));
// 404页面
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
