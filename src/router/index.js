import Vue from 'vue';
import VueRouter from 'vue-router';
import welcome from '../components/welcome/welcome.vue';
import education from '../components/education/education.vue';
import doctors from '../components/doctors/doctors.vue'
import symptoms from '../components/symptoms/symptoms.vue';
import ambulence from '../components/ambulence/ambulence.vue';
import questions from '../components/questions/questions.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: welcome,
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: welcome,
  },
  {
    path: '/education',
    name: 'education',
    component: education,
  },
  {
    path: '/nearestDoctors',
    name: 'nearestDoctors',
    component: doctors,
  },
  {
    path: '/ambulence',
    name: 'ambulence',
    component: ambulence,
  },
  {
    path: '/symptoms',
    name: 'symptoms',
    component: symptoms,
  },
  {
    path: '/questions',
    name: 'questions',
    component: questions,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
