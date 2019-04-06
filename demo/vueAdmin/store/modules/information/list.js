import {queryGrades} from "./../../../api/api.js";
const state={
  testName: '',
  tableData: [],
}

//getters
const getters={
 
}
//mutations
const mutations={
  init(state){
    state.testName="lukang";
  },
  setData(state,obj){
    state.tableData=obj
    console.log(state)
  }
}
//actions
const actions={
  queryGrades({state,commit}){
    //console.log(context)
    queryGrades().then((data)=>{
      console.log(data)
      commit('setData',JSON.parse(data).grades)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}