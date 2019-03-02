import Login from './components/Login.vue';
import NotFound from './components/404.vue';

//登陆进去之后的主页面
import Home from './components/Home.vue';

//用户中心
import UserCenter from './components/userCenter.vue';

//南京运满满实习
import Table from './components/ymm/Table.vue';
import Form from './components/ymm/Form.vue';
import QueryUser from "./components/ymm/QueryUser.vue";
import Echarts from "./components/ymm/Echarts.vue";

//南京甲骨文实习

//测试中心
import Test from "./components/testCenter/Test.vue";

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
    meta:{requiresAuth: true},
    children: [{
      path: 'user',
      component: UserCenter,  
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
      path: 'test',
      component: Test
    },{
      path: 'echarts',
      component: Echarts
    }]
  },
]

export default  routes;