/**
 * @file 全局路由前置钩子
 * @author Yangholmes 2021-04-01
 */

import store from '@/store';
import {getToken} from '@/drivers/utils';

export default (to, from, next) => {
    const token = getToken();

    store.dispatch('getUserInfo').then(res => {
        const {data} = res;
        const {access} = data;

    });
};
