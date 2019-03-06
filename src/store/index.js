import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users.js'
import edit from './modules/information/edit.js';
import list from './modules/information/list.js';


Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    users,
    edit,
    list
  },
  strict: false
})
