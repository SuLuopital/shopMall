<template>
  <div class="goodsinfo-container">

    
      <transition 
        @before-enter= "beforeEnter"
        @enter= "enter"
        @after-enter= "afterEnter"
      >
        <div class="ball" v-show="ballflag" ref="ball"></div>
      </transition>


    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbolist="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click = addToShopCar>加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDsec(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>


  </div>
</template>

<script>
// 轮播图组件
import Swiper from "../subcomponents/swiper.vue";

// numberbox
import NumBox from '../subcomponents/goodsinfo_numbox.vue'


export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballflag: false,
      selectedCount: 1,  //默认输入框选中的数字是1
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo(){
        this.$http.get('api/goods/getinfo/' + this.id).then(result => {
            if(result.body.status === 0){
                this.goodsinfo = result.body.message[0]
                // console.log(this.goodsinfo)
            }else {
                console.log('error')
            }
        })
    },
    goComment(id){
        // 商品评论
        this.$router.push({ path: '/home/goodscomment/'+ id })
    },
    goDsec(id){
        this.$router.push({ path: '/home/goodsdesc/' + id})
    },
    addToShopCar(){
        this.ballflag = !this.ballflag
        
        // 拼接出一个商品数组
        var goodsinfo = {
            id: this.id,
            count: this.selectedCount,
            price: this.goodsinfo.sell_price,
            selected: true,
        }

        this.$store.commit('addToCar',goodsinfo)
    },
    beforeEnter(el){
        el.style.transform = 'translate(0,0)'
        el.style.opacity = 1
    },
    enter(el,done){
        // 对加入购物车位置特效确定位置
        
        // 获取徽标的位置  getBoundingClientRect()
        var badgePosition = document.getElementById('badge').getBoundingClientRect();

        // 获取小球位置
        var ballPosition = this.$refs.ball.getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left
        const yDist = badgePosition.top - ballPosition.top




        el.offsetWidth
        el.style.opacity = 0
        el.style.transform = `translate(${ xDist }px,${ yDist }px)`
        el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
        done()
    },
    afterEnter(){
        this.ballflag = !this.ballflag
    },
    getSelectedCount(count){
        this.selectedCount = count
        // console.log("父组件拿到的数量值为：" + this.selectedCount )
    }

  },
  components: {
    swiper: Swiper,
    'numbox': NumBox,
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
      display: block;
      button {
          margin: 15px 0;
      }
  }

  .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 410px;
      left: 151px;
      transform: translate(210px,87px) 
  }
}
</style>
