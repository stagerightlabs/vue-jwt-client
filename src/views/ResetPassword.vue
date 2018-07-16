<template>
  <div>
    <h1>Reset Password</h1>
    <p class="text-center my-8">Complete your password reset request by filling out this form:</p>
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
          <p class="text-red text-sm mt-1" v-if="hasValidationError('email')">{{ getValidationError('email') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter focus:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-full-name" type="password" v-model="password">
          <p class="text-red text-sm mt-1" v-if="hasValidationError('password')">{{ getValidationError('password') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Repeat
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter focus:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-full-name" type="password" v-model="password_confirmation">
          <p class="text-red text-sm mt-1" v-if="hasValidationError('password_confirmation')">{{ getValidationError('password_confirmation') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
            type="button"
            @click.prevent="attemptPasswordChange">Reset Password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import bus from '@/bus'
import axios from '@/axios'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['code'],
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    attemptPasswordChange () {
      axios.post('/api/password/reset', {
        email: this.email,
        token: this.code,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then((response) => {
        this.$router.push({name: 'Login'})
        if (response.data.hasOwnProperty('message')) {
          bus.$emit('flash', 'Your password has been reset. Please log in to continue.', 'success')
        }
      }).catch(() => {
        // see axios config
      })
    },
    ...mapMutations([
      'clearFormErrors'
    ])
  },
  computed: {
    ...mapGetters([
      'hasValidationError',
      'getValidationError'
    ])
  }
}
</script>
