import * as api from './../../api/api.js';
const state={
  isLogin: false,
  administrator: {},
  //loginTime=[]
}

//getters
const getters={
 
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
  //浏览器重新刷新 state.isLogin回复为默认值 如果在登录状态 则改变状态即可
  refresh(state){
    state.isLogin=true;
    state.administrator=JSON.parse(window.sessionStorage.getItem('admin'))
  }
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