import Vue from "vue";
import Vuex from "vuex";
import VueRouter from 'vue-router';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/stylus/common.styl';
import routes from './routeMap.js';
import App from "./App.vue";
import store from './store';

//模拟拦截请求
import './mock/response.js';

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Vuex)
const router=new VueRouter({
  mode: 'hash',
  routes: routes
})
router.push('/login');
new Vue({
    el:"#app",
    store,
    router,
    template: `<App/>`,
    components: {'App':App},
}) 