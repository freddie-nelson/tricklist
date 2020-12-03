import { createStore } from 'vuex'

export default createStore({
  state: {
    showNewLearn: true
  },
  mutations: {
    SET_SHOW_NEW_LEARN(state, bool) {
      state.showNewLearn = bool;
    }
  },
  actions: {
  },
  modules: {
  }
})
