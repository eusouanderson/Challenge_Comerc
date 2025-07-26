import LoginView from '@/pages/Login.vue';
import MovieDashboardView from '@/pages/MovieDashboard.vue';
import UserClientView from '@/pages/UserClient.vue';
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
