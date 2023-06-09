import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../pages/SignUp.vue'),
    },
  ],
});

export default router;
