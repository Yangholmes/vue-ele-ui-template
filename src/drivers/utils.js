/**
 * @file 工具函数
 * @author Yangholmes 2021-04-01
 */

import Cookies from 'js-cookie';

import {tokenKey, cookieExpires} from '@/config';

/**
 * 设置 token
 * @param {String} token token
 * @param {String} key key
 */
export const setToken = (token, key = tokenKey) => {
    Cookies.set(key, token, {expires: cookieExpires || 1});
};

/**
 * 获取 token
 * @param {String} key key
 * @returns token
 */
export const getToken = (key = tokenKey) => {
    const token = Cookies.get(key);
    if (token) {
        return token;
    }
    return '';
};

export const parsePath = (path = '') => {
    if (!path) {
        return ['/'];
    }
    let base = '';
    let paths = path.split('/');
    paths.shift();
    return paths.map(p => {
        base = base + '/' + p;
        return base;
    });
}