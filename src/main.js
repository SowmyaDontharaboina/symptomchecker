import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
export default new Vuetify({ })


new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App),
}).$mount('#app');
