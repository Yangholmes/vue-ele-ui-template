/**
 * @file 路由入口
 * @author Yangholmes 2021-03-31
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import beforeEach from './beforeEach';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        name: 'home',
        path: '/',
        component: () => import('@/pages/home/Home.vue')
    }]
});

router.beforeEach(beforeEach);

export default router;
