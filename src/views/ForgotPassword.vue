<template>
  <div>
    <h1>Forgot Password</h1>
    <form class="w-full max-w-sm mx-auto">
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter focus:border-purple rounded w-full py-2 px-4 text-grey-darker"
            id="inline-full-name"
            type="email"
            v-model="email"
          >
          <p class="text-red text-sm mt-1" v-if="hasError('email')">{{ getErrorMessage('email') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
            type="button"
            @click.prevent="sendRequest">Help Me!
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      email: '',
      errors: {}
    }
  },
  methods: {
    sendRequest () {
      let self = this

      if (this.email.length === 0) {
        window.flash('You must provide an email address', 'danger')
        return
      }

      axios.post(this.apiUrl + '/api/password/email', {
        email: self.email
      })
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error)
          if (error.response.hasOwnProperty('data')) {
            this.errors = error.response.data.errors
          }
        })
        .finally(function () {
          self.$router.push({name: 'Login'})
          window.flash('A reset link has sent to your email account.', 'success')
        })
    },
    hasError (key) {
      return Object.prototype.hasOwnProperty.call(this.errors, key)
    },
    getErrorMessage (key) {
      return this.hasError(key) ? this.errors[key][0] : null
    },
    clearErrors () {
      this.errors = {}
    }
  }
}
</script>
