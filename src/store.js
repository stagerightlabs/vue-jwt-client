import Vue from 'vue'
import bus from '@/bus'
import Vuex from 'vuex'
import axios from '@/axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jsonWebToken: null,
    userEmail: null,
    userName: null,
    formErrors: {}
  },
  mutations: {
    setAuthCredentials (state, authData) {
      state.jsonWebToken = authData.token
    },
    clearAuthCredentials (state) {
      state.jsonWebToken = null
    },
    setFormErrors (state, errors) {
      state.formErrors = errors
    },
    clearFormErrors (state) {
      state.formErrors = {}
    },
    setUserEmail (state, email) {
      state.userEmail = email
    },
    clearUserEmail (state) {
      state.userEmail = null
    },
    setUserName (state, name) {
      state.userName = name
    },
    clearUserName (state) {
      state.userName = null
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    login ({ commit, dispatch }, credentials) {
      axios.post('api/login', { email: credentials.email, password: credentials.password })
        .then((response) => {
          dispatch('getUser')
          const now = new Date()
          const expirationDate = new Date(now.getTime() + (response.data.expires_in * 1000))
          localStorage.setItem('auth_token', response.data.access_token)
          localStorage.setItem('auth_expiration', expirationDate)

          commit('setAuthCredentials', {
            token: response.data.access_token
          })
          dispatch('setLogoutTimer', response.data.expires_in)

          router.push({ name: 'Dashboard' })
        }).catch(() => {}) // See axios config for basic error handling
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
        localStorage.removeItem('auth_expiration')
        commit('clearAuthCredentials')
        return
      }
      commit('setAuthCredentials', {
        token: jwt
      })
    },
    logout ({ commit }) {
      commit('clearAuthCredentials')
      commit('clearUserEmail')
      commit('clearUserName')
      bus.$emit('flash', 'Goodbye! Your session has ended.', 'success')
      localStorage.removeItem('auth_token')
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
        localStorage.setItem('auth_expiration', expirationDate)

        commit('setAuthCredentials', {
          token: response.data.access_token
        })
        dispatch('setLogoutTimer', response.data.expires_in)
        dispatch('getUser')
        bus.$emit('flash', 'Registration complete; you have been signed in.', 'success')

        router.push({ name: 'Dashboard' })
      }).catch(() => {}) // See axios config for basic error handling
    },
    getUser ({ commit }) {
      axios.get('api/user')
        .then((response) => {
          commit('setUserEmail', response.data.email)
          commit('setUserName', response.data.name)
        })
        .catch(() => {
          bus.$emit('flash', 'I could not retrieve your user profile from the server.', 'danger')
        })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.jsonWebToken !== null
    },
    jsonWebToken (state) {
      return state.jsonWebToken
    },
    userEmail (state) {
      return state.userEmail
    },
    userName (state) {
      return state.userName
    },
    hasValidationError: (state) => (input) => {
      return Object.prototype.hasOwnProperty.call(state.formErrors, input)
    },
    getValidationError: (state) => (input) => {
      if (Object.prototype.hasOwnProperty.call(state.formErrors, input)) {
        const error = state.formErrors[input]

        return Array.isArray(error) ? error[0] : error
      }

      return null
    }
  }
})
