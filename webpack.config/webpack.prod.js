/**
 * @file webpack 生产环境配置
 * @author Yangholmes 2021-01-05
 */

const webpack = require('webpack');

const {merge} = require('webpack-merge');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// merge config
const config = merge(require('./webpack.config.js'), {
    mode: 'production',
    output: {
        publicPath: '/'
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
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
