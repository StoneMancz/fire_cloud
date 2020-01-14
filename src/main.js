import Vue from 'vue';
import App from './App.vue';
import router from './router'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAMap from 'vue-amap';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/basic.css';
import './assets/styles/font-awesome/css/font-awesome.css';
// 引入echars
import echarts from 'echarts'
// 添加echarts插件
Vue.prototype.$echarts = echarts
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.config.productionTip = false;
Vue.prototype.$http = axios
VueAMap.initAMapApiLoader({
  key: 'd131f815357afc30295997020bd15940',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

//路由守卫
router.beforeEach((to, from, next) => {
  //无论是刷新还是路由跳转，第一个进入的就是这个路由前置钩子
  if (to.meta.requireAuth) {
      if (store.state.token) {
          next();
      } else {
          next({
              path: '/',
              query: {
                  redirect: to.fullPath
              }
          })
      }
  } else {
      next();
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')