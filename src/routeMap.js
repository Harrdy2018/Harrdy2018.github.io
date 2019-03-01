import Login from './components/Login.vue';
import NotFound from './components/404.vue';

import Home from './components/Home.vue';

import User from './components/User.vue';

import Table from './components/Table.vue';
import Form from './components/Form.vue';
import QueryUser from "./components/QueryUser.vue";

import Echarts from "./components/charts/Echarts.vue";
const routes=[
  //单独的登陆界面
  {
    path: '/login',
    component: Login,
    name: 'Login',
    alias: '/bb', 
  },{
    path: '/404',
    component: NotFound,
  },{
    path: '/home',
    component: Home,
    redirect: '/home/user',
    name: 'home',
    children: [{
      path: 'user',
      component: User
    },{
      path: 'table',
      component: Table
    },{
      path: 'form',
      component: Form
    },{
      path: 'query',
      component: QueryUser
    },{
      path: 'echarts',
      component: Echarts
    }]
  },
]

export default  routes;