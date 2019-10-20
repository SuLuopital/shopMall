<template>
    <div>
        <!-- 轮播图 -->
        <!-- <div>
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in lunboList" :key="item.id">
                    <img :src="item.img" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div> -->
        <swiper :lunbolist="lunbolist" :isfull="true"></swiper>

        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newList">
                            <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photolist">
                            <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>        
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/goodslist">
                            <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newList">
                            <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>  
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newList">
                            <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></router-link></li>  
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newList">
                            <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></router-link></li>                            
		        </ul>

    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'

export default {
    data(){
        return {
            lunbolist: []
        }
    },
    created(){
        this.getLunbotu()
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getlunbo').then(result => {
                if(result.body.status === 0){
                    // console.log(result.body)
                    this.lunbolist = result.body.message
                }else {
                    console.log('error')
                }
            })
        }
    },
    components: {
        'swiper': swiper
    }
}
</script>

<style lang="scss" scoped>


 .mui-grid-view.mui-grid-9 {
     background-color: #fff;

     img {
         width: 60px;
         height: 60px;
     }
 }

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}
</style>
