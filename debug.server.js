const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const serverPort = 55555;
const devPort = 9090;

for (let i in config.entry) {
  config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, 'webpack/hot/dev-server');
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());


const proxy = {
  '*': 'http://localhost:' + serverPort
}

let compiler = webpack(config)
// 启动服务
let app = new WebpackDevServer(compiler, {
  contentBase: './dist/',
  hot: true,
  proxy: proxy
});

app.listen(devPort, function(){
    console.log('dev server on http://localhost:' + devPort + '\n');
});
