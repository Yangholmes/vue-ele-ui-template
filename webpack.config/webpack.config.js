/**
 * @file webpack 通用配置
 * @author Yangholmes 2020-12-22
 */

const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            root: path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['vue-style-loader', 'style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 524288
                        }
                    }
                ]
            },
            {
                test: /\.(woff|ttf)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'app',
            template: path.join(__dirname, '../public/', 'index.html')
        })
    ]
};
