import { createStore } from 'vuex'

function addTricksToLocalStorage(tricks) {
  localStorage.setItem("tricks", JSON.stringify(tricks));
}

function addLearntToLocalStorage(tricks) {
  localStorage.setItem("learnt", JSON.stringify(tricks));
}

const tricks = JSON.parse(localStorage.getItem("tricks")) || [];
const learnt = JSON.parse(localStorage.getItem("learnt")) || [];

export default createStore({
  state: {
    newLearn: {
      show: false,
      trick: "",
    },
    tricks: tricks,
    learnt: learnt,
  },
  mutations: {
    SET_NEW_LEARN(state, obj) {
      if (!obj.show) {
        state.newLearn.show = false;
        state.newLearn.trick = "";
      } else {
        state.newLearn.show = true;
        state.newLearn.trick = obj.trick.text;
        
        const { trick } = obj;
        state.tricks.splice(trick.i, 1);
        addTricksToLocalStorage(state.tricks);
        
        delete trick.i;
        trick.completed = true;
        trick.dateCompleted = new Date().getTime();

        state.learnt.push(trick);
        addLearntToLocalStorage(state.learnt);
      }
    },
    ADD_TRICK(state, trick) {
      state.tricks.push({
        id: Math.random().toString().split(".")[1],
        text: trick,
        dateAdded: new Date().getTime(),
        completed: false,
        dateCompleted: null,
      });

      addTricksToLocalStorage(state.tricks);
    },
  },
  actions: {},
  modules: {},
});
