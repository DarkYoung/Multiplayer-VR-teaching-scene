// epxress 的主要文件，指定模板引擎、视图文件默认路径等
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// body-parser 是express的post请求中用来获得请求体(请求参数)的一种第三方包
const bodyParser = require('body-parser');

const routes = require('./routes/index');
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


app.set("views", path.join(__dirname, 'dist')); //设置视图文件根路径
// app.use('/static', express.static(path.join(__dirname, 'dist'))); // 设置根路径
app.use('/', routes);

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
