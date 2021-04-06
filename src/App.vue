<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this);
    }
};
</script>

<style lang="less">

</style>
