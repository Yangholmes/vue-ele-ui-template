/**
 * @file 组件表
 * @description 使用具名模块引入组件
 * @author Yangholmes 2021-03-31
 */

// 举例：
const Home = () => import(
    /* webpackChunkName: "c/Home" */
    '@/pages/home/Index.vue'
);
const Test = () => import(
    /* webpackChunkName: "c/Test" */
    '@/pages/test/Index.vue'
);

export default {
    Home, Test
};
