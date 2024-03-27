import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home/Home.vue';
import Report from '@/pages/Report/Report.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/:id',
    name: 'report',
    component: Report,
    meta: {
      title: 'Visualizar relatório'
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, _) => {
  document.title = to.meta?.title as string
})