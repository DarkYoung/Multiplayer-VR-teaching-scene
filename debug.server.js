const path = require('path');
const webpack = require('webpack');
// const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const serverPort = 55555;
const devPort = 9090;

for (let i in config.entry) {
  config.entry[i].unshift('webpack-dev-server/client?reload=true?http://localhost:' + devPort, 'webpack/hot/dev-server');
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());


const proxy = {
  '*': 'http://localhost:' + serverPort
}

let compiler = webpack(config)
// 启动服务
let app = new WebpackDevServer(compiler, {
  contentBase: '/static/',
  hot: true,
  proxy: proxy
});
app.webpackHotMiddleware = webpackHotMiddleware(compiler);

// app.use(WebpackDevMiddleware(compiler, {
// publicPath: config.output.publicPath,
// quiet: true
// }));

// const DIST_DIR = path.join(__dirname, "dist");

// app.get("*", (req, res, next) => {
//   const filename = path.join(DIST_DIR, 'index.html');

//   complier.outputFileSystem.readFile(filename, (err, result) => {
//     if (err) {
//       return (next(err));
//     }
//     res.set('content-type', 'text/html');
//     res.send(result);
//     res.end();
//   })
// });
app.listen(devPort, function () {
  console.log('dev server on http://localhost:' + devPort + '\n');
});
