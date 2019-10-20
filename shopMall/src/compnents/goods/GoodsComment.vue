<template>

<!-- 商品评论子组件 -->
<div>
    <cmtbox :id="id"></cmtbox>
</div>

</template>

<script>
import cmtbox from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            id: this.$route.params.id
        }
    },
    methods: {},
    components: {
        'cmtbox': cmtbox
    }
}
</script>

<style lang="scss" scoped>

</style>
