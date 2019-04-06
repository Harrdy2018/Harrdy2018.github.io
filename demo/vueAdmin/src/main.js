import Vue from "vue";
import Vuex from "vuex";
import VueRouter from 'vue-router';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/stylus/common.styl';
import routes from './routeMap.js';
import App from "./App.vue";
import store from './store';
//引入自己封装的echarts
import myCharts from './comm/myCharts.js';
Vue.use(myCharts);
//console.log(Vue.prototype)
//模拟拦截请求
import './mock/response.js';

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Vuex)
const router=new VueRouter({
  mode: 'hash',
  routes: routes
})

router.beforeEach((to,from,next)=>{
  console.log(to,from)
  if(to.matched.some(record=>record.meta.requiresAuth)){
    console.log('检查到了这是一个需要验证登陆的界面！！！')
    console.log(store)
    if(store.state.users.isLogin){
      console.log('你现在已经处于登陆状态，可以进去了')
      next()
    }else{
      console.log('你现在不处于登陆状态，不可以进去了')
      //为什么这里的时候 this undefined
      console.log(this)
      console.log(window)
      window.alert('警告哦，您还没有登录本系统，请登录！！')
      next({path: '/login'})
    }
  }else{
    console.log('检查到了这不是一个需要验证登陆的界面，您可以直接进去！！！')
    console.log(store)
    next()
  }
})
//router.push('/login');
new Vue({
    el:"#app",
    store,
    router,
    template: `<App/>`,
    components: {'App':App},
}) 