/**
 * @file 用户信息接口
 * @author Yangholmes 2021-04-01
 */

import a from './instances/user';
import {getToken} from '@/drivers/utils';

export const getUserInfo = () => {
    return a.request({
        url: '/getUserInfo',
        method: 'GET',
        headers: {
            token: getToken()
        }
    })
};