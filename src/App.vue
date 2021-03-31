<template>
    <div>

    </div>
</template>

<script>
import req from 'axios';
export default {
    mounted() {
        req.get('/testapi/').then(res => {
            console.log(res);
        });
    }
};
</script>

<style lang="less">

</style>
