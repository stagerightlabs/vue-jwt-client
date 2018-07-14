import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Secrets from '@/views/Secrets.vue'
import NotFound from '@/views/NotFound.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

Vue.use(Router)

export default new Router({
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
      beforeEnter: (to, from, next) => {
        if (window.authority.authenticated()) {
          return next()
        }

        return next({ name: 'Login' })
      }
    },
    {
      path: '/secrets',
      name: 'Secrets',
      component: Secrets,
      beforeEnter: (to, from, next) => {
        // if (window.authority.authenticated()) {
        //   return next()
        // }

        return next({ name: 'Login' })
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
