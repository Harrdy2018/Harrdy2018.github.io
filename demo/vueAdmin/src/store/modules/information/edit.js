const state={
  testName: '',
  form: {
    name: '',
    wuli: '',
    huaxue: '',
    shengwu: '',
    id: ''
  }
}

//getters
const getters={
  postdata(){
    return {
      name: state.form.name,
      wuli: state.form.wuli,
      huaxue: state.form.huaxue,
      shengwu: state.form.shengwu,
      id: state.form.id,
    }
  }
}
//mutations
const mutations={
  init(state){
    state.testName="lk";
    state.form.name='';
    state.form.wuli='';
    state.form.huaxue='';
    state.form.shengwu='';
    state.form.id='';
  }
}
//actions
const actions={

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}