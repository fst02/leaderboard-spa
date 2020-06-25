import Vue from 'vue';
import VueRouter from 'vue-router';
import TopScores from '../views/TopScores.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'TopScores',
    meta: { title: 'Top Scores' },
    component: TopScores,
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: { title: 'Registration' },
    component: () => import('../views/Registration.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    meta: { title: 'Sign In' },
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { title: 'Profile' },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/registration/verify',
    name: 'Verification',
    meta: { title: 'Verification' },
    component: () => import('../views/Verification.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
