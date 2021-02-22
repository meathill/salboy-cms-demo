import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import PageList from "@/views/PageList";
import Page from '@/views/Page';
import UserLogin from '@/views/login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pages',
    name: 'page.list',
    component: PageList,
  },
  {
    path: '/page/new',
    name: 'page.new',
    component: Page,
  },
  {
    path: '/page/:id',
    name: 'page.edit',
    component: Page,
  },
  {
    path: '/login',
    name: 'user.login',
    component: UserLogin,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
