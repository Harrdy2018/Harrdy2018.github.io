const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin.js');
const webpack = require('webpack');
const config={
    entry: {
        app: "./src/main.js",
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname,"dist"),
        compress: true,
        disableHostCheck: true,
        allowedHosts: [],
        host: "0.0.0.0",
        open: false,
        port: 9000,
        quiet: false,
        headers: {
            "X-Custom-Foo": "bar",
            "lukang": "hahah"
        },
        hot: true,
        inline: true,
    },
    plugins: [
        //注意现在这个clean-webpack-plugin插件是2版本
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: "各种各样的MessageBox",
            template: "./src/myTemplate.html"
        }),
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
      },
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader",'css-loader']},
            {test: /\.styl(us)?$/, use: ["style-loader",'css-loader',"stylus-loader"]},
            {test: /\.vue$/, use: ["vue-loader"]},
            {test: /\.(png|svg|jpg|gif)$/,use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/,use: ['file-loader']},
        ]
    },
    resolve: {
        alias: {'vue$': 'vue/dist/vue.esm.js'}
    },
    mode: "development"
};
module.exports=config;