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
const Page1 = () => import(
    /* webpackChunkName: "c/Page1" */
    '@/pages/page1/Index.vue'
);
const Test = () => import(
    /* webpackChunkName: "c/Test" */
    '@/pages/test/Index.vue'
);

export default {
    Home, Page1, Test
};
