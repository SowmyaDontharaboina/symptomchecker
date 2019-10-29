import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: []
  },
  getters: {
    getResult: function (state){
      return state.result.filter(function(value){
        return value === 'Yes';
      }).length;
    }
  },
  mutations: {
    ADD_RESULT(state, payload) {
      state.result.push(payload);
      console.log(43);
      console.log(state);
    }
  },
  actions: {
    PUSH_ANSWER(context, payload) {
      context.commit("ADD_RESULT", payload);
    }
  },
  modules: {
  },
});
