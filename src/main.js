import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import LoginPage from './components/LoginPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import store from './store'; 
import EnrollmentPage from './components/EnrollmentPage'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/dashboardPage', component: DashboardPage },
  { path: '/enrollmentPage', component: EnrollmentPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store); 
app.mount('#app');
