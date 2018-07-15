import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Secrets from '@/views/Secrets.vue'
import NotFound from '@/views/NotFound.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/password/reset/:code',
      name: 'ResetPassword',
      component: ResetPassword,
      props: true
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/secrets',
      name: 'Secrets',
      component: Secrets,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

// Set up global navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
