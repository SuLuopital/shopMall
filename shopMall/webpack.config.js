// webpack是以node构建的
var path = require('path')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中挂载一个plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin')

var VueLoaderPlugin = require('vue-loader/lib/plugin')

// 当以命令行形式运行webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供要打包的文件
// 的入口和出口文件，此时，它会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象然后进
// 行打包构建

module.exports = {
    entry: path.join(__dirname, './src/main.js'),  //入口文件
    output: {
        path: path.join(__dirname, './dist'),   //输出路径
        filename: 'bundle.js' //指定输出文件的名称
    },
    plugins: [ //所以webpack 插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),  //指定模板文件路径
            filename: 'index.html'  //设置生成的内存页面名称
        }),
        new VueLoaderPlugin()
    ],
    module: { //配置所有第三方loader模块的
        rules: [ // 第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },  //正则表示以css结尾的，对css文件进行处理
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //处理less文件
            { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']}, //处理sass文件
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' },  //处理图片路径loader
            { test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader' },  //处理字体文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //bebel处理高级语法
            { test: /\.vue$/,use: 'vue-loader'}
        ]
    }
}
