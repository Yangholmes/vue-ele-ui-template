/**
 * @file 全局路由前置钩子
 * @author Yangholmes 2021-04-01
 */

import store from '@/store';
import {getToken} from '@/drivers/utils';

import router from './index';
import routes from './routes';

export default (to, from, next) => {
    const token = getToken();

    if (1) {
        store.dispatch('user/getUserInfo').then(res => {
            const {data} = res;
            const {access} = data;
            let r = access.find(a => a.path === to.path);
            if (r) {
                const component = routes[r.component];
                r = Object.assign({}, r, {
                    component
                });
                router.options.routes = [r];
                router.addRoute(r);
                next();
            }
        });
    }

};
