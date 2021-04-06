<!-- 跳板页 -->
<template>
    <div>
        Test
    </div>
</template>

<script>
export default {
    mounted: async function() {
        const route = this.$route;
        let access = this.$store.state.app.access.find(a => {
            const toPath = route.query._toPath || '/';
            return a.path === toPath
        });
        const routes = await import('@/router/routes');
        let component = null;

        // 开发环境，利用 router 表加载组件模块
        if (process.env.NODE_ENV === 'development') {
            component = routes.default[access.component];
            access = Object.assign({}, access, {
                loaded: true,
                component
            });
            this.$router.addRoute(access);
            this.$router.replace(access.path);
        }
        // 生产环境，利用 __webpack_require__ 加载组件模块
        else {
            __webpack_require__.e(access.component).then(e => {
                let moduleId = null;
                for (let i = webpackJsonp.length - 1; i >= 0; i--) {
                    if (webpackJsonp[i][0][0] === access.component) {
                        moduleId = Object.keys(webpackJsonp[i][1])[0];
                    }
                }
                component = __webpack_require__(moduleId).default;
                access = Object.assign({}, access, {
                    loaded: true,
                    component
                });
                this.$router.addRoute(access);
                this.$router.replace(access.path);
            });
        }
    }
};
</script>

<style lang="">

</style>
