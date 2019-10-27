import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: []
  },
  mutations: {
    ADD_RESULT(state, payload) {
      state.result.push(payload);
    }
  },
  actions: {
    addResult(context, payload) {
      context.commit("ADD_RESULT", payload);
    }
  },
  modules: {
  },
});
