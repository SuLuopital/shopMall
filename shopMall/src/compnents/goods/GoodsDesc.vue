<template>
<!-- 图文介绍 -->
<div class="goodsdesc-container">
    <h3>{{goodsdec.title}}</h3>

    <hr>

    <div class="content" v-html="goodsdec.content" tag="div"></div>
</div>

</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            goodsdec: {} 
        }
    },
    created(){
        this.getDesc()
    },
    methods: {
        getDesc(){
            this.$http.get('api/goods/getdesc/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsdec = result.body.message[0]
                    // console.log(this.goodsdec)
                }else {
                    console.log('error')
                }
            })
        }
    }
}
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    // text-align: center;
    margin: 15px 0;
  }
  .content {
    .img {
      width: 100%;
    }
  }
}
</style>
