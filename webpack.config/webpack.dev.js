/**
 * @file webpack dev 环境
 * @author Yangholmes 2020-12-22
 */

const express = require('express');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const portDetector = require('./portDetector');

// merge config
const config = merge(require('./webpack.config.js'), {
    mode: 'development',
    entry: ['webpack-hot-middleware/client'],
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

const app = express();
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
);

app.use(
    webpackHotMiddleware(compiler)
);

// Serve the files on port 3000.
portDetector(3000).then(port => {
    app.listen(port, function () {
        console.log('listening on port 3000.\n');
    });
}).catch(err => {
    console.error(err);
});
