<template>
    <div id="newsinfo-container">
         <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dataFormat }}</span>
            <span>点击{{newsinfo.click}}次</span>
        </p>

        <hr>

        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
// 导入评论组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            // 获取新闻详情
            this.$http.get('api/getnew/' + this.id).then(result => {
                if(result.body.status === 0){
                    // console.log(this.id)
                    // console.log(result.body)
                        this.newsinfo = result.body.message[0]
                    }else{
                        console.log('error')
                }
            })        
        }
    },
    components: {
        'comment-box': comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 4px;
    .title {
        font-size: 16px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: 100%
        }
    }
}
</style>
