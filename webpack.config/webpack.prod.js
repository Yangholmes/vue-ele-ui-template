/**
 * @file webpack 生产环境配置
 * @author Yangholmes 2021-01-05
 */

const webpack = require('webpack');

const {merge} = require('webpack-merge');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const TerserPlugin = require("terser-webpack-plugin");

const {publicPath} = require('../src/config');

// merge config
const config = merge(require('./webpack.config.js'), {
    mode: 'production',
    output: {
        publicPath: publicPath || '/',
        library: {
            name: 'MyLib',
            type: 'umd',
        }
    },
    optimization: {
        chunkIds: 'named',
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true
        })
    ]
});

const compiler = webpack(config);

compiler.run((err, stats) => {
    if (err) {
        console.error(err);
        return false;
    }

    console.log(stats.toString({
        chunks: false,
        colors: true
    }));
});
