import router from '@/router'
import store from '@/store'

const axios = require('axios')

// Configure defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
console.log(process.env.VUE_APP_API_URL)

// If we have a jwt token, use it
axios.interceptors.request.use((config) => {
  if (store.getters.isAuthenticated) {
    config.headers.Authorization = `Bearer ${store.state.jsonWebToken}`
  }

  return config
  // Do something with request error
}, error => Promise.reject(error))

// Enable the "finally" method
require('promise.prototype.finally').shim()

// Set up a response interceptor to redirect on 401 responses
// Add a response interceptor
axios.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    router.push({ name: 'Login' })
    store.commit('clearAuthCredentials')
  }
  return Promise.reject(error)
})

export default axios
