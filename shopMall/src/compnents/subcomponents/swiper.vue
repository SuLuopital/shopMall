<template>
<!-- 谁调用就必须向子组件传入lunbolist数组 -->
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbolist" :key="item.id">
        <img :src="item.img" :class="{'full': isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props: ["lunbolist","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;
    
    .mint-swipe-item {
        text-align: center;

        img {
        // width: 100%;
        height: 100%;
        }
    }
}

.full {
    width: 100%
}
</style>
