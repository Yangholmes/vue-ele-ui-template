/**
 * @file 工具函数
 * @author Yangholmes 2021-04-01
 */

import Cookies from 'js-cookie';

import {tokenKey, cookieExpires} from '@/config';

export const setToken = (token, key = tokenKey) => {
    Cookies.set(key, token, {expires: cookieExpires || 1});
};

export const getToken = (key = tokenKey) => {
    const token = Cookies.get(key);
    if (token) {
        return token;
    }
    return '';
};
