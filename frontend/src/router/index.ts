import LoginView from '@/pages/LoginView.vue';
import MovieDashboardView from '@/pages/MovieDashboardView.vue';
import UserClientView from '@/pages/UserClientView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/management', component: UserClientView },
  { path: '/movies', component: MovieDashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
