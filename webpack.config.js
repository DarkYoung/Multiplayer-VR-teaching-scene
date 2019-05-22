/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:30:17 
 * @Last Modified by: JasonZhang
 * @Last Modified time: 2019-05-22 22:02:34
 */
const path = require('path');
const webpack = require('webpack');
/**
 * 根据模式匹配获取文件列表的node模块
 * 方便获取src/app/page路径下的所有js入口文件
 * 实现自动的进行与入口文件相对应的模板配置
 */
const glob = require('glob');
/*
 * extract-text-webpack-plugin插件，将你的样式提取到单独的css文件里，不用担心样式会被打包到js文件里了。
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 * html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SplitChunksPlugin = webpack.optimize.SplitChunksPlugin;
const extractCSS = new ExtractTextPlugin('css/[name].css');

const debug = process.env.NODE_DEV !== 'production';
const entries = getEntry('src/app/page/**/*.js', 'src/app/page/')
var chunks = Object.keys(entries);

var config = {
  mode: 'development',
  // 配置入口文件，有几个写几个
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/static/', // 模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js', // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[name].chunk.js?[chunkhash]' // chunk生成的配置
  },
  module: {
    // 加载器，关于各个加载器的参数配置
    rules: [{
        test: /\.css$/,
        // 配置css的抽取器、加载器。
        use: extractCSS.extract({
          use: [{
              loader: 'css-loader'
            },
            {
              loader: 'resolve-url-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.less$/,
        // 配置less的抽取器、加载器。
        use: extractCSS.extract({
          use: [{
              loader: 'css-loader'
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }, {
        // html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
        // 比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
        test: /\.html$/,
        use: 'html-loader?attrs=img:src img:data-src'
      }, {
        // 文件加载器，处理文件静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=./fonts/[name].[ext]'
      }, {
        // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        // 如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&name=./img/[hash].[ext]'
      }, {
        // 模型
        test: /\.(glb|gltf|obj|mtl)$/,
        use: 'file-loader?name=./models/[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      // ,
      // {
      // test: require.resolve('jquery'),
      // use: 'expose-loader?$!expose-loader?jQuery'
      // }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次构建项目清除 dist 文件夹
    new webpack.ProvidePlugin({ // 加载jq
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new SplitChunksPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: chunks, // 提取哪些模块共有的部分
      minChunks: chunks.length // 提取至少2个模块共有的部分
    }),
    extractCSS, // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    new webpack.HotModuleReplacementPlugin() // 热加载
  ],
  devtool: 'inline-source-map',
  // 使用webpack-dev-server，提高开发效率
  devServer: {
    contentBase: './dist/',
    host: 'localhost',
    port: 3000,
    inline: true,
    hot: true
  }
};

// HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
const pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'));
pages.forEach(function (pathname) {
  var conf = { // 根据模板插入css/js等生成最终HTML
    filename: './' + pathname + '.html', // 生成的html存放路径，相对于path
    template: './src/view/' + pathname + '.html', // html模板路径
    inject: false, // js插入的位置，true/'head'/'body'/false
    hash: true, // 为静态资源生成hash值
    minify: { // 压缩HTML文件
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: false // 删除空白符与换行符
    }
  };
  if (pathname in config.entry) {
    conf.favicon = './src/assets/favicon.ico'; // favicon路径，通过webpack引入同时可以生成hash值
    conf.inject = 'body';
    conf.chunks = ['vendors', pathname]; // 需要引入的chunk，不配置就会引入所有页面的资源
    // chunksSortMode: 'dependency';
    conf.hash = true;
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
});
module.exports = config;

function getEntry(globPath, pathDir) {
  let files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname;
  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.normalize(path.join(dirname, basename));
    pathDir = path.normalize(pathDir);
    if (pathname.startsWith(pathDir)) {
      pathname = pathname.substring(pathDir.length);
    }
    entries[pathname] = ['./' + entry];
  }
  return entries;
}
