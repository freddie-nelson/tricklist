import { createStore } from 'vuex'

export default createStore({
  state: {
    newLearn: {
      show: false,
      trick: ""
    },
    tricks: []
  },
  mutations: {
    SET_NEW_LEARN(state, obj) {
      if(!obj.show) {
        state.newLearn.show = false;
        state.newLearn.trick = ""
      } else {
        state.newLearn = { ...obj };
      }
    },
    ADD_TRICK(state, trick) {
      state.tricks.push({
        text: trick
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
