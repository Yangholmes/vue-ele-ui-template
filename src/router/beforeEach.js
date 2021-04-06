/**
 * @file 全局路由前置钩子
 * @author Yangholmes 2021-04-01
 */

import store from '@/store';
import {getToken} from '@/drivers/utils';

import router from './index';

export default (to, from, next) => {
    const token = getToken();

    if (!token) {
        store.dispatch('user/getUserInfo').then(async res => {
            console.log(res);
            if (to.name === 'test') {
                next();
            }
            next({
                name: 'test',
                meta: to.meta,
                hash: to.hash,
                params: to.params,
                query: Object.assign({}, to.query, {_toPath: to.path})
            });
        });
    }
    next();
};
