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
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = await nhost.auth.isAuthenticatedAsync();

    if (!isAuthenticated) {
      return next('/login');
    }
  }
  next();
});

export default router;
