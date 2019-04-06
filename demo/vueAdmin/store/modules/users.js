import * as api from './../../api/api.js';
const state={
  isLogin: eval(window.sessionStorage.getItem('isLogin')) || false,
  administrator: JSON.parse(window.sessionStorage.getItem('admin')) || {}
  //loginTime=[]
}

//getters
const getters={
  getLoginStatus: state=>state.isLogin,
}
//mutations
const mutations={
  //登录进来 做两件事
  updateAdministrator(state,obj){
    //储存管理员信息到 sessionStorage
    console.log('储存管理员信息到 sessionStorage')
    window.sessionStorage.setItem('admin',JSON.stringify(obj));
    window.sessionStorage.setItem('isLogin',true)
    //同步信息到state
    state.administrator=obj
    state.isLogin=true

    //window.localStorage.setItem(obj.id,new Date().toLocaleString())
    //state.loginTime.push()
    
    console.log(state)
  },
}
//actions
const actions={
  requestLogin(context,params){
    console.log('正在执行 requestLogin action')
    console.log(context)
    console.log(params)
    return api.requestLogin(params);
  },
  updateAdministrator({commit},obj){
    commit('updateAdministrator',obj);
  },
  getUserList(context,params){
    return api.getUserList(params)
  },
  removeUser(context,params){
    return api.removeUser(params)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}