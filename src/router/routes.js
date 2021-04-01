/**
 * @file 组件表
 * @description 使用具名模块引入组件
 * @author Yangholmes 2021-03-31
 */

// 举例：
const Home = () => import(
    /* webpackChunkName: "Home" */
    '@/pages/home/Home.vue'
);

export default {
    Home
};
