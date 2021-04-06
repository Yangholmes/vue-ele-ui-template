/**
 * @file 入口
 * @author Yangholmes 2021-03-31
 */


import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router';
import store from './store';
import App from './App.vue';

// 伪造接口
import '/mock';

Vue.use(ElementUI);
const app = new Vue({
    render: h => h(App),
    router,
    store
});

app.$mount('#app');

// console.log(router);