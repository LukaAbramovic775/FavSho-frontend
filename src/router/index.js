import { createRouter, createWebHistory } from 'vue-router'
import { Auth } from '@/service/index.js'

const routes = [
  {
    path: '/',
    name: 'seriespage',
    component: SeriesPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/show',
    name: 'show',
    component: () => import(/* webpackChunkName: "login" */ '../views/Show.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const javneStranice = ["/login", "/signup"]
  const loginPotreban = !javneStranice.includes(to.path)
  const user = Auth.getUser();

  if (loginPotreban && !user){

    next("/login");
    return;
  }
  
  next();
})
export default router