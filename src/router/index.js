/**
 * @file 路由入口
 * @author Yangholmes 2021-03-31
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import beforeEach from './beforeEach';

import {publicPath} from '@/config';

Vue.use(VueRouter);

const base = process.env.NODE_ENV === 'production' && publicPath || '/';

const router = new VueRouter({
    mode: 'history',
    base,
    routes: [{
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */'@/pages/error/404.vue')
    }]
});

router.beforeEach(beforeEach);

export default router;
