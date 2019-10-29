import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vuetify/dist/vuetify.min.css'

import './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueSweetalert2);
export default new Vuetify({ })

export const EventBus = new Vue();


new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App),
}).$mount('#app');
