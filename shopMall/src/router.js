import VueRouter from 'vue-router'

// 组件导入
import HomeContainer from './compnents/tabber/HomeContainer.vue'
import MemberContainer from './compnents/tabber/MemberContainer.vue'
import ShopcarContainer from './compnents/tabber/ShopcarContainer.vue'
import SearchContainer from './compnents/tabber/SearchContainer.vue'
import NewsList from './compnents/news/NewsList.vue'
import NewsInfo from './compnents/news/newsinfo.vue'
import Comment from './compnents/subcomponents/comment.vue'
import PhotoList from './compnents/photos/PhotoList.vue'
import PhotoInfo from './compnents/photos/PhotoInfo.vue'
import GoodsList from './compnents/goods/GoodsList.vue'
import GoodsInfo from './compnents/goods/GoodsInfo.vue'
import GoodsComment from './compnents/goods/GoodsComment.vue'
import GoodsDesc from './compnents/goods/GoodsDesc.vue'

var router = new VueRouter({
    routes: [  //匹配规则
        { path: '/',redirect: '/home'},
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newList', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        // { path: '/comment/:id', component: Comment },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoodsInfo },
        { path: '/home/goodscomment/:id', component: GoodsComment },
        { path: '/home/goodsdesc/:id', component: GoodsDesc },
    ],
    linkActiveClass: 'mui-active',
})

export default router
