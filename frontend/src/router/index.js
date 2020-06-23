import Vue from 'vue';
import VueRouter from 'vue-router';
import TopScores from '../views/TopScores.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'TopScores',
    component: TopScores,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
