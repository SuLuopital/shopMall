// 入口

import Vue from 'vue'

// 路由模块
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)

// Mint UI 组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//根组件
import app from './App.vue'

// MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJson = true;

// 全局时间过滤器
import moment from 'moment'
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {
        car: car
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: {
        addToCar(state,goodsinfo) {
            var flag = false;
            // 查找购物车中是否有相同的商品，有的话改变数目就可以了
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += goodsinfo.count;
                    flag = true
                    return true                       
                }
            })

            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 更新之后进行持久化存储
            localStorage.setItem('car',JSON.stringify(state.car))

        },
        updataGoodsInfo(state, goodsinfo) {
            state.car.forEach(item => {
                if (parseInt(item.id) === parseInt(goodsinfo.id)) {
                    item.count = parseInt(goodsinfo.count)
                }
            })
             // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if (parseInt(item.id) === parseInt(id)) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, selectedInfo) {
            state.car.some(item => {
                if (item.id == selectedInfo.id) {
                    item.selected = selectedInfo.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var count = {}
            state.car.forEach(item => {
                // 以键值对的形式
                count[item.id] = item.count
            })
            return count
        },
        getGoodsSelected(state) {
            var select = {}
            state.car.forEach(item => {
                select[item.id] = item.selected
            })
            return select
        },
        getGoodsCountAndAmount(state) {
            var couAmount = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    couAmount.count = item.count
                    couAmount.amount = item.price * item.count
                }
            })
            return couAmount
        }
    },
})

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(app),
    router,
    store,
})