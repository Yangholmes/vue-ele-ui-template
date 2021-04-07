/**
 * @file 全局路由前置钩子
 * @author Yangholmes 2021-04-01
 */

import store from '@/store';
import {getToken} from '@/drivers/utils';

import router from './index';

export default (to, from, next) => {
    // TODO
    // 多层菜单查找
    // 菜单缓存命中
    const token = getToken();
    if (!token) {
        store.dispatch('user/getUserInfo').then(async res => {
            const route = to;
            let access = store.state.app.access.find(a => {
                const toPath = route.path || '/';
                return a.path === toPath
            });
            // 告知 webpack ，组件需要构建
            const routes = await import(
                /* webpackChunkName: "routes" */
                '@/router/routes'
            );
            let component = null;

            // 开发环境，利用 router 表加载组件模块
            if (process.env.NODE_ENV === 'development') {
                component = routes.default[access.component];
                access = Object.assign({}, access, {
                    loaded: true,
                    component
                });
                router.addRoute(access);
                router.replace(access.path);
            }
            // 生产环境，利用 __webpack_require__ 加载组件模块
            else {
                __webpack_require__.e(access.component).then(e => {
                    let moduleId = null;
                    for (let i = webpackChunkMyLib.length - 1; i >= 0; i--) {
                        if (webpackChunkMyLib[i][0][0] === access.component) {
                            moduleId = Object.keys(webpackChunkMyLib[i][1])[0];
                        }
                    }
                    component = __webpack_require__(moduleId).default;
                    access = Object.assign({}, access, {
                        loaded: true,
                        component
                    });
                    router.addRoute(access);
                    router.replace(access.path);
                });
            }
        });
    }
    next();
};
