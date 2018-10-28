import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {},
    isLogin: false
  },
  mutations: {
    usercontext: (state, payload) => {
      debugger
      state.userinfo = payload
      state.isLogin = true
    }
  }
})

export default store
