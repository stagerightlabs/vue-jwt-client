import router from '@/router'
import store from '@/store'
import axios from 'axios'
import bus from '@/bus'

const customized = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// Configure defaults
// axios.defaults.headers.common[''] =
// axios.defaults.baseURL =

// If we have a jwt token, use it
customized.interceptors.request.use((config) => {
  if (store.getters.isAuthenticated) {
    config.headers.Authorization = `Bearer ${store.state.jsonWebToken}`
  }

  return config
  // Do something with request error
}, error => Promise.reject(error))

// Set up a response interceptor to redirect on 401 responses
// Add a response interceptor
customized.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    router.push({ name: 'Login' })
    store.commit('clearAuthCredentials')
  }
  if (error.response.status > 400) {
    if (Object.prototype.hasOwnProperty.call(error.response.data, 'message')) {
      bus.$emit('flash', error.response.data.message, 'danger')
    }
    if (Object.prototype.hasOwnProperty.call(error.response.data, 'errors')) {
      store.commit('setFormErrors', error.response.data.errors)
    }
  }
  return Promise.reject(error)
})

export default customized
