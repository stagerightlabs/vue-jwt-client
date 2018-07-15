import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'vue-awesome/components/Icon.vue'

// Enable production tips from Vue. (not required)
// https://vuejs.org/v2/api/#productionTip
Vue.config.productionTip = true

// Register third-party plugins
Vue.component('icon', Icon)

// Attempt to read credentials from local storage
store.dispatch('tryAutoLogin')

// Create the primary vue instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
