const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: "练习OPPO手机首页网站",
            template: "./src/myTemplate.html"
        }),
        //自动加载模块，而不必到处import或require
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
      },
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader",'css-loader']},
            {
                test: /\.vue$/,
                use: ["vue-loader"],
            },
            {test: /\.(png|svg|jpg|gif)$/,use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/,use: ['file-loader']},
        ]
    },
    mode: "development"
};
module.exports=config;