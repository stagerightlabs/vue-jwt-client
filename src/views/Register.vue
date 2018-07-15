<template>
  <div>
    <h1>Register</h1>
    <form class="w-full max-w-sm mx-auto">
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Name
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-full-name" type="text" v-model="registration.name">
          <p class="text-red text-sm mt-1" v-if="hasValidationError('name')">{{ getValidationError('name') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-full-name" type="email" v-model="registration.email">
          <p class="text-red text-sm mt-1" v-if="hasValidationError('email')">{{ getValidationError('email') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-username" type="password" v-model="registration.password">
          <p class="text-red text-sm mt-1" v-if="hasValidationError('password')">{{ getValidationError('password') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
            Repeat
          </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-username" type="password"   v-model="registration.password_confirmation">
        </div>
      </div>
      <div class="md:flex md:items-baseline">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
            type="button"
            @click.prevent="register">Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      registration: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    register () {
      this.clearFormErrors()
      this.$store.dispatch('register', this.registration)
    },
    resetForm () {
      this.registration = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
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
