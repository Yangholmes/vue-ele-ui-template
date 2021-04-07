/**
 * @file 项目配置
 * @description 照顾构建工具，使用 CommonJS 模块
 * @author Yangholmes 2021-04-01
 */

exports.publicPath = '/new-access/';

exports.tokenKey = 'token';
exports.cookieExpires = 1;

exports.baseUrl = {
    user: {
        development: '/userapi/api/',
        production: '/new-access/api/'
    }
};
