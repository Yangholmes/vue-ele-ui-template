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

    if (!token) {
        store.dispatch('user/getUserInfo').then(res => {
            const {data} = res;
            const {access} = data;
            access.forEach(a => {
                if (a.path === to.path) {
                    const component = routes[a.component];
                    a = Object.assign({}, a, {
                        component
                    });
                    router.addRoute(a);
                    console.log(a);
                    next();
                }
            });
        });
    }

};
