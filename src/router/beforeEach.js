/**
 * @file 全局路由前置钩子
 * @author Yangholmes 2021-04-01
 */

import store from '@/store';
import {getToken, parsePath} from '@/drivers/utils';

import router from './index';

let routes = [];

/**
 * 遍历权限表，下载未加载的模块
 */
function compare(access = [], paths = [], parentName = null) {
    if (!paths.length || !access.length) {
        return [];
    }
    let path = paths.shift();
    let tmp = access.find(a => a.path === path);
    let result = paths.length ? tmp && compare(tmp.children, paths, tmp.name) : !!tmp;
    if (tmp && !tmp.loaded) {
        const component = routes.default[tmp.component];
        tmp.loaded = true;
        const route = Object.assign({}, tmp, {
            children: [],
            component
        });
        parentName ? router.addRoute(parentName, route) : router.addRoute(route);
    }
    return result && access;
}

export default async (to, from, next) => {
    const {path, matched} = to;
    const token = getToken();
    // 告知 webpack ，组件需要构建
    routes = await import(
        /* webpackChunkName: "routes" */
        '@/router/routes'
    );

    // 先加载 access
    if (!token || !store.state.accessUpdated) {
        await store.dispatch('user/getUserInfo');
    }

    if (matched.length) {
        next();
    }
    else {
        console.log('ggg');
        const paths = parsePath(path);
        let access = compare(store.state.app.access, paths);
        if (access) {
            router.replace(to);
        }
        else {
            router.replace('/404');
        }
    }

};
