import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: [],
    symptoms:['cough','fever']
  },
  getters: {
    getResult: function (state){
      return state.result.filter(function(value){
        return value === 'Yes';
      }).length;
    },
    getSymptoms: function(state) {
      const obj={};
      obj.cough = state.symptoms.includes('cough');
      obj.fever = state.symptoms.includes('fever');
      console.log(obj);
      return obj;
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
