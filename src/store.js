import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'
import router from '@/router'
// import EventBus from '@/event-bus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jsonWebToken: null,
    userEmail: null
  },
  mutations: {
    setAuthCredentials (state, authData) {
      state.jsonWebToken = authData.token
      state.userEmail = authData.userEmail
    },
    clearAuthCredentials (state) {
      state.jsonWebToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    login ({ commit, dispatch }, credentials) {
      axios.post('/login', { email: credentials.email, password: credentials.password })
        .then((response) => {
          const now = new Date()
          const expirationDate = new Date(now.getTime() + (response.data.expires_in * 1000))
          localStorage.setItem('auth_token', response.data.access_token)
          localStorage.setItem('auth_email', response.data.auth_email)
          localStorage.setItem('auth_expiration', expirationDate)

          commit('setAuthCredentials', {
            token: response.data.access_token,
            userEmail: response.data.auth_email
          })
          dispatch('setLogoutTimer', response.data.expires_in)

          router.push({ name: 'Dashboard' })
        })
        .catch(() => {
          // if (Object.prototype.hasOwnProperty.call(error.response.data, 'message')) {
          //   EventBus.$emit('flash', error.response.data.message, 'danger')
          // } else {
          //   console.log(error.response)
          // }
        })
    },
    tryAutoLogin ({ commit }) {
      const jwt = localStorage.getItem('auth_token')
      if (!jwt) {
        return
      }
      const expirationDate = localStorage.getItem('auth_expiration') ? new Date(localStorage.getItem('auth_expiration')) : ''
      const now = new Date()
      if (now >= expirationDate) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_email')
        localStorage.removeItem('auth_expiration')
        commit('clearAuthCredentials')
        return
      }
      commit('setAuthCredentials', {
        token: jwt,
        userEmail: localStorage.getItem('auth_email')
      })
    },
    logout ({ commit }) {
      commit('clearAuthCredentials')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
      localStorage.removeItem('auth_expiration')
      router.push({ name: 'Login' })
    },
    register ({ commit, dispatch }, registration) {
      axios.post('api/register', {
        name: registration.name,
        email: registration.email,
        password: registration.password,
        password_confirmation: registration.password_confirmation
      }).then(response => {
        const now = new Date()
        const expirationDate = new Date(now.getTime() + (response.data.expires_in * 1000))
        localStorage.setItem('auth_token', response.data.access_token)
        localStorage.setItem('auth_email', response.data.auth_email)
        localStorage.setItem('auth_expiration', expirationDate)

        commit('setAuthCredentials', {
          token: response.data.access_token,
          userEmail: response.data.auth_email
        })
        dispatch('setLogoutTimer', response.data.expires_in)

        router.push({ name: 'Dashboard' })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.jsonWebToken !== null
    }
  }
})
