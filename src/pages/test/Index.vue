<!-- 跳板页 -->
<template>
    <div>
        Test
    </div>
</template>

<script>
export default {
    mounted: async function() {
        let router = this.$store.state.app.router;
        let access = this.$store.state.app.access[0];
        const routes = await import('@/router/routes');
        if (process.env.NODE_ENV === 'development') {
            const component = routes.default[access.component];
            access = Object.assign({}, access, {
                component
            });
            this.$router.addRoute(access);
            this.$router.replace(access.path);
        }
        else {
            // TODO
        }
    }
};
</script>

<style lang="">

</style>
