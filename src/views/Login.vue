<template>
  <div>
    <h1>Login</h1>
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
            v-model="credentials.email"
          >
          <p class="text-red text-sm mt-1" v-if="hasError('email')">{{ getErrorMessage('email') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter focus:border-purple rounded w-full py-2 px-4 text-grey-darker"
            id="inline-username"
            type="password"
            v-model="credentials.password"
          >
        </div>
      </div>
      <div class="md:flex md:items-baseline">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
            type="button"
            @click.prevent="login">Login
          </button>
          <button
            class="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 ml-2 border border-purple hover:border-transparent rounded"
            type="button"
            @click.prevent="forgot">Forgot Password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    forgot () {
      this.$router.push({ name: 'ForgotPassword' })
    },
    login () {
      this.clearErrors()
      this.$store.dispatch('login', this.credentials)
    },
    resetForm () {
      this.credentials = {
        email: '',
        password: ''
      }
      this.clearErrors()
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
