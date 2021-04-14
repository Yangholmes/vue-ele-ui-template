/**
 * @file 全局路由前置钩子
 * @author Yangholmes 2021-04-01
 */

import store from '@/store';
import {getToken, parsePath} from '@/drivers/utils';

import router from './index';

// import routes from '@/router/routes';

let routes = [];

/**
 * 遍历权限表，下载未加载的模块
 *
 * @param {Array} access 权限树
 * @param {Array} paths 路由
 * @param {string} parentName 父路由名称
 * @returns {boolean|Array}
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
        // 有父路由的添加到父路由下，无父路由的添加到根
        parentName ? router.addRoute(parentName, route) : router.addRoute(route);
    }
    return result && access;
}

/**
 * 路由守卫钩子
 */
export default async (to, from, next) => {
    const {path, matched} = to;
    const token = getToken();
    // 告知 webpack ，组件需要具名构建
    routes = await import(
        /* webpackChunkName: "routes" */
        '@/router/routes'
    );

    // 先加载 access
    if (!token || !store.state.accessUpdated) {
        await store.dispatch('user/getUserInfo');
    }

    // 命中记录
    // 避免重复查询权限
    if (matched.length) {
        next();
    }
    // 未命中记录
    else {
        const paths = parsePath(path);
        let access = compare(store.state.app.access, paths);
        // 权限判断
        if (access) {
            // TODO
            // 刷新 store.state.access 数据
            router.replace(to);
        }
        else {
            // 无权限吔
            router.replace('/404');
        }
    }
};
